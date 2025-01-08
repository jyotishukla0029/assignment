'use client'
import React, {ChangeEventHandler} from 'react';

export interface Option {
    id: any,
    label: string
}
interface FormSelectProps {
    label: string,
    name: string,
    options: Option[],
    value?: string,
    onChange?: ChangeEventHandler<HTMLSelectElement>,
    error?: string,
    required?: boolean,
}
const FormSelect = ( props :FormSelectProps) => {
    return (
        <div className="mb-4">
            {props.label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {props.label}
                    {props.required && <span className="text-red-500"> *</span>}
                </label>
            )}
            <select
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm ${
                    props.error ? 'border-red-500' : 'border-gray-300'
                }`}
                required={props.required}
            >
                <option disabled defaultChecked>Please Choose</option>
                {props.options.map(option=> (<option key={option.id} value={option.id} id={option.id}>{option.label}</option>))}
            </select>
            {props.error && <p className="mt-1 text-sm text-red-500">{props.error}</p>}
        </div>
    );
};

export default FormSelect;