
function endQuizModal({ onClose, onSubmit }) {

    return (
      <div className="fixed inset-0 overflow-y-auto z-20">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="px-6 py-4">
              <div className="flex items-start">
                <div className="ml-3">
                  <p className="text-md text-gray-900 font-extrabold bg-white">
                    Are You Sure You Want To End This Quiz Session?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => {
                  onSubmit();
                  onClose();
                }}
                className="w-1/2 border bg-white border-transparent rounded-none p-4 flex items-center justify-center text-lg font-extrabold text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="w-1/2 border bg-white border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-lg font-extrabold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default endQuizModal
  