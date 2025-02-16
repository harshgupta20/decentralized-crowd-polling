import React from 'react'

const TaskCard = ({ taskId, title, options, optionWithMaxCount }) => {
    return (
        <div className="bg-white shadow-sm rounded-lg p-4 w-full sm:w-80 md:w-96 transition-all duration-200 hover:shadow-md">
            {/* Title Section */}
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">Task ID: {taskId}</p>

            {/* Options Section */}
            {options?.length > 0 && options.map((option, index) => {
                const isMaxCount = option?.id === optionWithMaxCount?.id; // Check if this option has the max votes
                return (
                    <div
                        key={option?.id || index}
                        className={`mt-4 p-4 rounded-md transition-all duration-200 relative ${
                            isMaxCount
                                ? 'bg-indigo-50 border-l-4 border-indigo-500' // Max count option style
                                : 'bg-gray-50'
                        }`}
                    >
                        {/* Most Voted Tag - Only show for the option with the max votes */}
                        {isMaxCount && (
                            <span className="absolute top-2 right-2 bg-green-200 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                Most Voted
                            </span>
                        )}

                        <p className="text-sm text-gray-700">Option {index + 1}</p>
                        <img
                            src={option?.image_url}
                            alt={`option-id-${option?.id}`}
                            className="w-32 h-32 object-cover rounded-md mb-2"
                        />
                        <p className="text-sm text-gray-600">Votes: {option?.count}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default TaskCard;
