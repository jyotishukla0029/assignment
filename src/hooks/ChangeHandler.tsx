'use client'

import {ChangeEvent, useState} from "react";

export const useChangeHandler = <T extends any>(defaultState: T) =>{
    const [payload, setPayload] = useState<T>(defaultState);

    const handleChange = (evt: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
        const {name, value} = evt.target;
        setPayload((prevState: any) => {
            const _data = {...prevState};
            if (evt.target instanceof HTMLInputElement && evt.target.type == 'radio' || evt.target.type == 'file' || evt.target.type == 'checkbox') {
                if (evt.target.type === 'radio') {
                    _data[name] = evt.target.value
                } else if (evt.target.type === 'checkbox') {
                    if (_data[name]) {
                        const _values = [..._data[name]];
                        const idx = _values.findIndex((itm:any)=> (itm == evt.target.value));
                        if (idx > -1) {
                            _values.splice(idx, 1)
                        } else {
                            _values.push(evt.target.value)
                        }
                        _data[name] = _values;
                    } else {
                        _data[name] = [evt.target.value]
                    }
                } else if (evt.target instanceof HTMLInputElement) {
                    if (evt.target.files && evt.target.files.length > 0) {
                        const file = evt.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();

                            reader.onloadend = () => {
                                // Get the Base64 encoded string from result
                                const base64String = reader.result as string;
                                _data[name] = base64String;
                                console.log('Base64 String:', base64String); // For demonstration
                            };

                            // Convert the file to a Base64 encoded string
                            reader.readAsDataURL(file);
                        }
                    }
                }
            } else
                _data[name] = value;
            return _data;
        });
    }

    return {payload, handleChange}
}