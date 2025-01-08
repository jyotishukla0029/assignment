'use client'


interface ConfirmationDialogProps {
    title: string;
    subtitle: string;
    show: boolean;
    className?: string;
    removeButtonText: string;
    onRemoveClick: () => void;
    onCloseClick: () => void;
    deleteLoader?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
                                                                   title,
                                                                   subtitle,
                                                                   removeButtonText,
                                                                   onRemoveClick,
                                                                   onCloseClick,
                                                                   className = '',
                                                                   show,
                                                                   deleteLoader,
                                                               }) => {
    return (
        <>
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`bg-white p-6 flex flex-col rounded shadow-lg ${className}`}>
                        <h2 className="text-lg font-bold text-black">{title}</h2>
                        <p className="mt-2 text-black">{subtitle}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                type="button"
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                onClick={onCloseClick}
                            >
                                Close
                            </button>
                            <button
                                disabled={deleteLoader}
                                type="button"
                                className="bg-transparent text-red-500 border-none px-4 py-2 rounded-md flex items-center"
                                onClick={onRemoveClick}
                            >
                                {deleteLoader ? (
                                    <div className="animate-spin border-2 border-t-transparent border-red-500 w-5 h-5 rounded-full"></div>
                                ) : (
                                    <span>{removeButtonText}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ConfirmationDialog;
