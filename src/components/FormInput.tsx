'use client'
import React, {ChangeEventHandler} from 'react';

interface FormInputProps {
    label: string,
    type: string,
    name: string,
    minLength?: number,
    value?: string,
    placeholder?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    error?: string,
    required?: boolean,
};
const FormInput = ( props :FormInputProps) => {
    return (
        <div className="mb-4">
            {props.label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {props.label}
                    {props.required && <span className="text-red-500"> *</span>}
                </label>
            )}
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                minLength={props.minLength}
                placeholder={props.placeholder}
                onChange={props.onChange}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm ${
                    props.error ? 'border-red-500' : 'border-gray-300'
                }`}
                required={props.required}
            />
            {props.error && <p className="mt-1 text-sm text-red-500">{props.error}</p>}
        </div>
    );
};

export default FormInput;