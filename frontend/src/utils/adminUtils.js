export const validateForm = (form) => {
  const requiredFields = ['type', 'title', 'price', 'description'];
  for (const field of requiredFields) {
    if (!form[field]) {
      alert(`Please fill in the ${field} field.`);
      return false;
    }
  }
  return true;
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  alert('An error occurred while processing your request. Please try again later.');
};

export const getFilteredPlans = (plans, searchTerm, filterType) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return plans.filter(plan => {
    const matchesSearch =
      plan.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      plan.description.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesFilter = filterType === 'all' || plan.type === filterType;
    return matchesSearch && matchesFilter;
  });
};

export const getPaginatedPlans = (plans, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return plans.slice(startIndex, startIndex + itemsPerPage);
};