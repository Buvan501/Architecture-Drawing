export const validateForm = (form) => {
  const requiredFields = ['type', 'title', 'price', 'description'];
  for (const field of requiredFields) {
    if (!form[field]) {
      return { valid: false, message: `Please fill in the ${field} field.` };
    }
  }
  return { valid: true };
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  // Try to derive a friendly message
  const message = error?.response?.data?.error || error?.message || 'An error occurred while processing your request.';
  return message;
};

export const getFilteredPlans = (plans, searchTerm, filterType) => {
  const lowerCaseSearchTerm = (searchTerm || '').toLowerCase();
  return plans.filter(plan => {
    const title = (plan.title || '').toLowerCase();
    const description = (plan.description || '').toLowerCase();
    const matchesSearch =
      title.includes(lowerCaseSearchTerm) || description.includes(lowerCaseSearchTerm);
    const matchesFilter = filterType === 'all' || plan.type === filterType;
    return matchesSearch && matchesFilter;
  });
};

export const getPaginatedPlans = (plans, searchTerm, filterType, currentPage, itemsPerPage) => {
  const filtered = getFilteredPlans(plans, searchTerm, filterType);
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filtered.slice(startIndex, startIndex + itemsPerPage);
};