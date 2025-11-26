export function authFetch(url: string, options: any = {}) {
    const token = localStorage.getItem("token");

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then(async res => {
        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || "Error en la petición");
        }
        return res.json();
    });
}