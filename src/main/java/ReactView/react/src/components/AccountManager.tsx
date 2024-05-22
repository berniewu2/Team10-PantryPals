import { useState } from "react";

interface AccountManagerProps {
    method: string;
    username?: string;
    password?: string;
    id?: string;
}

export function AccountManager({method, username, password, id} : AccountManagerProps) {
    const [returnValue, setReturnValue] = useState('');

    switch(method) {
        case 'deleteUser':
            fetch(`https://az3u50k7ec.execute-api.us-east-2.amazonaws.com/${method}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                })
            })
            .then(response => response.text())
            .then(data => { setReturnValue(data) })
            .catch(error => console.error('Error:', error));
            break;
        
        default:
            fetch(`https://az3u50k7ec.execute-api.us-east-2.amazonaws.com/${method}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            .then(response => response.text())
            .then(data => { setReturnValue(data) })
            .catch(error => console.error('Error:', error));
            break;
    }

    return {returnValue};
}