export const uploadFiles = async (file: File[] | null) => {

    const formData = new FormData()

    if (file) {
        if (Array.isArray(file)) {
            file.forEach((f) => formData.append('files', f));
        } else {
            formData.append('files', file);
        }
    }

    try {
        const response = await fetch('/api/upload', {
            method: "POST",
            body: formData
        })

        if (!response.ok) {
            throw new Error('Fail to send data')
        }

        return await response.json()

    } catch (e) {
        console.error(e);

    }
}