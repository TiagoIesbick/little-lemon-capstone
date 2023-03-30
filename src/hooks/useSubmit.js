import { useState } from "react";


const useSubmit = () => {
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const submit = async (url, data = {}) => {
        setLoading(true);
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(message => setResponse(message));
        } catch (error) {
            setResponse(error);
        } finally {
            setLoading(false);
        }
    };

    return { isLoading, response, submit };
};

export default useSubmit;