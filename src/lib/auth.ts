export async function setAuthCookie(name: string, token: string) {
	try {
		const response = await fetch('/api/auth/set-cookie', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, token }),
		});

		return await response.json();
	} catch (error) {
		console.error('Error setting auth cookie:', error);
		throw error;
	}
}
