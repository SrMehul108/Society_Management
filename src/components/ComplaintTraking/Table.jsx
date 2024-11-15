// Table.js
import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto border rounded-t-2xl">
      <table className="min-w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-100 border-b">
            {columns.map((column, index) => (
              <th
                key={index}
                className="p-3 text-left font-semibold text-sm text-gray-600"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="p-3 text-left font-semibold text-sm text-gray-600">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b hover:bg-gray-50"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="p-3 text-sm text-gray-700"
                >
                  {typeof column.render === 'function'
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </td>
              ))}
              {actions && (
                <td className="p-3 text-sm flex gap-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={action.className}
                      onClick={() => action.onClick(row)}
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
