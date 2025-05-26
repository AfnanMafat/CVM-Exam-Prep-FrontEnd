import { Link } from 'react-router';
import { MagnifyingGlassIcon, DocumentTextIcon, PlusCircleIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  // Sample data - replace with real data from your backend
  const branches = ['CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical'];
  const recentMaterials = [
    { 
      id: 1, 
      title: 'Data Structures Notes', 
      type: 'notes',
      branch: 'CSE',
      subject: 'CS201',
      uploadedBy: 'John Doe',
      downloads: 142
    },
    {
      id: 2,
      title: '2023 Exam Papers',
      type: 'past_papers',
      branch: 'ECE',
      subject: 'EC101',
      uploadedBy: 'Jane Smith',
      downloads: 89
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            <AcademicCapIcon className="h-12 w-12 inline-block mr-3 text-blue-600" />
            UniExamPrep
          </h1>
          <Link 
            to="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Upload Material
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-lg mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials by title, author, or subject..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <option value="all">All Types</option>
              <option value="books">Books</option>
              <option value="notes">Notes</option>
              <option value="past_papers">Past Papers</option>
              <option value="tutorials">Tutorials</option>
            </select>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Branch</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {branches.map((branch) => (
            <Link
              key={branch}
              to={`/branch/${branch.toLowerCase()}`}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <BookOpenIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-800">{branch}</h3>
              <p className="text-sm text-gray-600">120+ Materials</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Materials Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Added Materials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {recentMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  {material.type === 'notes' && <AcademicCapIcon className="h-6 w-6 text-blue-600" />}
                  {material.type === 'past_papers' && <DocumentTextIcon className="h-6 w-6 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{material.title}</h3>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>{material.branch}</span>
                    <span>•</span>
                    <span>{material.subject}</span>
                    <span>•</span>
                    <span>{material.uploadedBy}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {material.type.replace('_', ' ')}
                    </span>
                    <span className="text-blue-600">
                      {material.downloads} downloads
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>© 2024 UniExamPrep. Connecting Students with Knowledge.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;