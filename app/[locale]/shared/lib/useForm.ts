import React, { useState } from 'react';

export function useForm<T extends Record<string, never>>(initial: T) {
    const [values, setValues] = useState<T>(initial);

    const handleChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValues(prev => ({ ...prev, [field]: e.target.value }));
        };

    const reset = () => setValues(initial);

    return { values, handleChange, reset };
}