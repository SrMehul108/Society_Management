export default function EmergencyManagement() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 w-96 mx-auto bg-white rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Alert</h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="alertType" className="block text-sm ">
              Alert Type*
            </label>
            <select
              id="alertType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              defaultValue="warning"
            >
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm ">
              Description*
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px] resize-none"
              placeholder="An emergency description typically refers to a detailed account or explanation of an emergency situation"
            />
          </div>

          <button
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-md hover:from-orange-600 hover:to-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
