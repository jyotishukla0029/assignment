'use client'
import React, {ChangeEventHandler} from 'react';
import {Option} from "@/components/FormSelect";

interface FormSelectionProps {
    label: string,
    name: string,
    type: 'radio'|'checkbox'
    options: Option[],
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    error?: string,
    required?: boolean,
}
const FormSelection = (props :FormSelectionProps) => {
    return (
        <div className="mb-4">
            {props.label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {props.label}
                    {props.required && <span className="text-red-500"> *</span>}
                </label>
            )}
            <div className={`formControl grid grid-cols-3 md:w-1/2 xl:w-1/3 2xl:w-1/4`}>
                {props.options.map(option => [<label key={`${props.name}_label_${option.id}`}
                                                     htmlFor={`${props.name}_${option.id}`}><input
                    key={`${props.name}_${option.id}`} type={props.type}
                    name={props.name} id={`${props.name}_${option.id}`}
                    defaultChecked={option.id == props.value} onChange={props.onChange}
                    value={option.id}
                required={props.required}/>
                    {option.label}</label>])}
            </div>
            {props.error && <p className="mt-1 text-sm text-red-500">{props.error}</p>}
        </div>
    );
};

export default FormSelection