import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ImageWithLoading from './ImageWithLoading';

const PlansPage = () => {
  const { type } = useParams();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [excelRows, setExcelRows] = useState([]);
  const [excelError, setExcelError] = useState('');
  const [simpleImageModal, setSimpleImageModal] = useState(false);
  const [excelRows3d, setExcelRows3d] = useState([]);
  const [excelError3d, setExcelError3d] = useState('');
  const twoDPackages = [
    { name: '2D Floor Plan (Up to G+2)', description: 'Basic 2D layout plan', price: '₹499 Only' },
    { name: 'Vastu 2D Floor Plan (Up to G+2)', description: '2D plan designed as per Vastu principles', price: '₹599 Only' },
    { name: 'Package - 1', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Ground Floor', price: '₹899 Only' },
    { name: 'Package - 2', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Up to G+2', price: '₹999 Only' },
    { name: 'Package - 3', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Ground Floor', price: '₹1199 Only' },
    { name: 'Package - 4', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Up to G+2', price: '₹1299 Only' },
    { name: 'Package - 5', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Ground Floor', price: '₹3999 Only' },
    { name: 'Package - 6', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Up to G+2', price: '₹4599 Only' },
    { name: 'Package - 7', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Above G+2', price: 'As per requirement' },
    { name: 'Package - 8', description: 'Customised Packages (Create your own package)', price: 'According to requirement' }
  ];
  const elevationPackages = [
    { name: 'Structural Drawing (Ground Floor)', description: 'Structural Drawing Plan for Ground Floor', price: '₹1/sqft Only' },
    { name: 'Package - 1', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Ground Floor', price: '₹899 Only' },
    { name: 'Package - 2', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Up to G+2', price: '₹999 Only' },
    { name: 'Package - 3', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Ground Floor', price: '₹1199 Only' },
    { name: 'Package - 4', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Up to G+2', price: '₹1299 Only' },
    { name: 'Package - 5', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Ground Floor', price: '₹3999 Only' },
    { name: 'Package - 6', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Up to G+2', price: '₹4599 Only' },
    { name: 'Package - 7', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Above G+2', price: 'As per Requirement' },
    { name: 'Package - 8', description: 'Customised Packages (Create your Own Package)', price: 'According to Requirement' }
  ];
  const structuralPackages = [
    { name: 'Structural Drawing (Ground Floor)', description: 'Structural Drawing Plan for Ground Floor', price: '₹1/sqft Only' },
    { name: 'Package - 1', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Ground Floor', price: '₹899 Only' },
    { name: 'Package - 2', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Up to G+2', price: '₹999 Only' },
    { name: 'Package - 3', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Ground Floor', price: '₹1199 Only' },
    { name: 'Package - 4', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Up to G+2', price: '₹1299 Only' },
    { name: 'Package - 5', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Ground Floor', price: '₹3999 Only' },
    { name: 'Package - 6', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Up to G+2', price: '₹4599 Only' },
    { name: 'Package - 7', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Above G+2', price: 'As per Requirement' },
    { name: 'Package - 8', description: 'Customised Packages (Create your Own Package)', price: 'According to Requirement' }
  ];
  const threeDPackages = [
    { name: '3D Floor Plan (Up to G+2)', description: '3D Floor Plan Design', price: '₹699 Only' },
    { name: 'Vastu 3D Floor Plan (Up to G+2)', description: '3D Floor Plan as per Vastu principles', price: '₹799 Only' },
    { name: 'Package - 1', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Ground Floor', price: '₹899 Only' },
    { name: 'Package - 2', description: '(2D Floor Plan + 3D Front Elevation & Structural Drawing) – Up to G+2', price: '₹999 Only' },
    { name: 'Package - 3', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Ground Floor', price: '₹1199 Only' },
    { name: 'Package - 4', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing) – Up to G+2', price: '₹1299 Only' },
    { name: 'Package - 5', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Ground Floor', price: '₹3999 Only' },
    { name: 'Package - 6', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Up to G+2', price: '₹4599 Only' },
    { name: 'Package - 7', description: '(2D Floor Plan + 3D Floor Plan + 3D Elevation + Structural Drawing + VR) – Above G+2', price: 'As per Requirement' },
    { name: 'Package - 8', description: 'Customised Packages (Create your own package)', price: 'According to Requirement' }
  ];

  useEffect(() => {
    fetchPlans();
  }, [type]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/plans?type=${type}`);
      const plansData = response.data.data || response.data;
      setPlans(plansData);
      setFilteredPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoading(false);
  };

  // Load 2D pricing table from public/data/2D-plans.xlsx
  useEffect(() => {
    const loadExcel = async () => {
      setExcelError('');
      setExcelRows([]);
      if ((type || '').toLowerCase() !== '2d') return;
      try {
        const response = await fetch('/data/2D-plans.xlsx');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        setExcelRows(Array.isArray(json) ? json : []);
      } catch (err) {
        setExcelError('Price table not found. Place 2D-plans.xlsx in public/data.');
      }
    };
    loadExcel();
  }, [type]);

  // Load 3D pricing table from public/data/3D-plans.xlsx
  useEffect(() => {
    const loadExcel3d = async () => {
      setExcelError3d('');
      setExcelRows3d([]);
      if ((type || '').toLowerCase() !== '3d') return;
      try {
        const response = await fetch('/data/3D-plans.xlsx');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        setExcelRows3d(Array.isArray(json) ? json : []);
      } catch (err) {
        setExcelError3d('Price table not found. Place 3D-plans.xlsx in public/data.');
      }
    };
    loadExcel3d();
  }, [type]);

  useEffect(() => {
    setFilteredPlans(plans.filter(plan => 
      plan.title.toLowerCase().includes(search.toLowerCase()) ||
      plan.description.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, plans]);

  const openModal = (plan, { simple = false } = {}) => {
    setSelectedPlan(plan);
    setSimpleImageModal(simple);
    setModalOpen(true);
  };

  const getTypeDisplayName = (type) => {
    const typeMap = {
      '2d': '2D Plans',
      '3d': '3D Plans', 
      'elevation': 'Front Elevation',
      'structural': 'Structural Designs',
      'vr': 'VR Plans'
    };
    return typeMap[type.toLowerCase()] || type.toUpperCase();
  };

  const typeLower = (type || '').toLowerCase();

  const renderPackagesTable = (t) => {
    const headerLabel = (t === 'structural' || t === 'elevation') ? 'Structural Drawing / Package' : 'Floor Plan / Package';
    let packages = [];
    if (t === '2d') packages = twoDPackages;
    else if (t === '3d') packages = threeDPackages;
    else if (t === 'elevation') packages = elevationPackages;
    else if (t === 'structural') packages = structuralPackages;
    if (!packages || packages.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-3 bg-white text-center text-sm font-medium tracking-wide text-black">
            PLANS & PACKAGES
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50/70">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-gray-700">{headerLabel}</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-700">Description</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {packages.map((item, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50/40 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 align-top font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-gray-700 align-top whitespace-pre-line">{item.description}</td>
                    <td className="px-6 py-4 text-gray-900 text-right font-medium align-top">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Helper: render a 3-column featured grid and an additional images grid
  const renderFeaturedGrid = (items = [], baseId = 'featured') => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {items.map((item, idx) => {
        const src = typeof item === 'string' ? item : item.src;
        const title = typeof item === 'string' ? '' : item.title || '';
        const id = `${baseId}-${idx}`;
        return (
          <div key={id} className="group border border-gray-200 overflow-hidden hover:border-black transition-colors">
            <button
              type="button"
              onClick={() => openModal({ id, title, image_path: src }, { simple: true })}
              className="relative overflow-hidden aspect-[4/3] w-full text-left"
              aria-label={`Enlarge ${title || 'Plan'}`}
            >
              <img
                src={src}
                alt={title || 'Plan'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                loading="lazy"
              />
            </button>
          </div>
        );
      })}
    </div>
  );

  const renderExtraGrid = (items = [], baseId = 'extra') => (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((src, idx) => (
          <div key={`${baseId}-${idx}`} className="group border border-gray-200 overflow-hidden hover:border-black transition-colors">
            <button
              type="button"
              onClick={() => openModal({ id: `${baseId}-${idx}`, title: '', image_path: src }, { simple: true })}
              className="relative overflow-hidden aspect-[4/3] w-full text-left"
              aria-label="Enlarge Plan"
            >
              <img
                src={src}
                alt="Plan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                loading="lazy"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            {getTypeDisplayName(type)}
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Explore our collection of {getTypeDisplayName(type).toLowerCase()}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-200 focus:border-black focus:outline-none text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Featured images for each type (2D / 3D / Elevation / Structural) */}
        {(type || '').toLowerCase() === '2d' && renderFeaturedGrid([
          { title: '30x37 2D Plan', src: encodeURI('/images/2D-Plans/2D plan (30_X37_)_.jpg') },
          { title: '35x29 2D Plan', src: encodeURI('/images/2D-Plans/2D plan (35_X29_).jpg') },
          { title: 'Sample Layout', src: encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230115.png') }
        ], 'featured')}

        {(type || '').toLowerCase() === '3d' && renderFeaturedGrid([
          '/images/3D-Plans/hotel-project.jpg',
          '/images/3D-Plans/residential-building-jpg-1.jpg',
          '/images/3D-Plans/office-building.jpg'
        ], 'featured-3d')}

        {(type || '').toLowerCase() === 'elevation' && renderFeaturedGrid([
          '/images/Elevation/Hotel project.jpg',
          '/images/Elevation/Office Building.jpg',
          '/images/Elevation/Residential Building jpg 1.jpg'
        ], 'featured-elev')}

        {(type || '').toLowerCase() === 'structural' && renderFeaturedGrid([
          '/images/structural-designs/SD-1.jpg',
          '/images/structural-designs/SD-2.jpg',
          '/images/structural-designs/SD-3.jpg'
        ], 'featured-struct')}





        {renderPackagesTable(typeLower)}

        {/* Additional images for each type (2D / 3D / Elevation / Structural) */}
        {(type || '').toLowerCase() === '2d' && renderExtraGrid([
          encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230045.png'),
          encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230105.png'),
          encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230128.png')
        ], 'extra-2d')}

        {(type || '').toLowerCase() === '3d' && renderExtraGrid([
          '/images/3D-Plans/hotel-project-jpg-2.jpg',
          '/images/3D-Plans/hotel-project-jpg3.jpg',
          '/images/3D-Plans/santhosh-render-with-ganesh-2.jpg',
          '/images/3D-Plans/santhosh-render-with-ganesh-3.jpg',
          '/images/3D-Plans/office-building2.jpg',
          '/images/3D-Plans/office-building3.jpg'
        ], 'extra-3d')}

        {(type || '').toLowerCase() === 'elevation' && renderExtraGrid([
          '/images/Elevation/Hotel project.jpg 2.jpg',
          '/images/Elevation/Hotel project.jpg3.jpg',
          '/images/Elevation/Office Building1.jpg',
          '/images/Elevation/Office Building2.jpg',
          '/images/Elevation/Office Building3.jpg',
          '/images/Elevation/Residential Building jpg 2.jpg',
          '/images/Elevation/Residential Building jpg 3.jpg',
          '/images/Elevation/Residential building(1).jpg',
          '/images/Elevation/Residential building(2).jpg',
          '/images/Elevation/Residential building.jpg',
          '/images/Elevation/Residential project.jpg',
          '/images/Elevation/RB.jpg'
        ], 'extra-elev')}

        {(type || '').toLowerCase() === 'structural' && renderExtraGrid([
          '/images/structural-designs/SD-4.jpg'
        ], 'extra-struct')}



        {/* Empty State
        {!loading && filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No plans found</p>
            <p className="text-sm text-gray-400">
              {search ? 'Try adjusting your search terms' : 'Check back later for new plans'}
            </p>
          </div>
        )} */}

        {/* Modal */}
        {modalOpen && selectedPlan && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {simpleImageModal ? (
                <>
                  <div className="relative max-h-[85vh] overflow-hidden">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-gray-700 hover:text-black rounded transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <ImageWithLoading
                      src={selectedPlan.image_path}
                      alt={selectedPlan.title}
                      className="w-full h-auto max-h-[85vh] object-contain bg-gray-50"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                      <h2 className="text-2xl font-medium text-black">{selectedPlan.title}</h2>
                      <p className="text-gray-500 text-sm">{getTypeDisplayName(type)}</p>
                    </div>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="relative max-h-[60vh] overflow-hidden">
                    <ImageWithLoading
                      src={selectedPlan.image_path}
                      alt={selectedPlan.title}
                      className="w-full h-auto max-h-[60vh] object-contain bg-gray-50"
                    />
                  </div>
                  <div className="p-6 bg-gray-50">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <div>
                        <p className="text-gray-600 text-sm mb-2">{selectedPlan.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Area: {selectedPlan.area || 'N/A'}</span>
                          <span>Price: {selectedPlan.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                          Download
                        </button>
                        <button className="px-6 py-2 bg-white text-black border border-black text-sm font-medium hover:bg-gray-50 transition-colors">
                          Customize
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;