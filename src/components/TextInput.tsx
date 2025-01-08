'use client'
import React, {ChangeEventHandler} from 'react';

interface TextInputProps {
    label: string,
    name: string,
    value?: string,
    minLength?: number,
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement>,
    error?: string,
    required?: boolean,
};
const FormInput = ( props :TextInputProps) => {
    return (
        <div className="mb-4">
            {props.label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {props.label}
                    {props.required && <span className="text-red-500"> *</span>}
                </label>
            )}
            <textarea
                value={props.value}
                name={props.name}
                minLength={props.minLength}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm ${
                    props.error ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={5}
                required={props.required}
            />
            {props.error && <p className="mt-1 text-sm text-red-500">{props.error}</p>}
        </div>
    );
};

export default FormInput;