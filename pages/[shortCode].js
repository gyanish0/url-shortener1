import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectPage() {
    const router = useRouter();
    const { shortCode } = router.query;

    useEffect(() => {
        if (shortCode) {
            const fetchUrl = async () => {
                try {
                    const response = await fetch(`/api/${shortCode}`);
                    
                    if (!response.ok) {
                        throw new Error('URL not found');
                    }

                    const data = await response.json();
                    window.location.href = data.originalUrl;
                } catch (error) {
                    router.push('/?error=invalid-url');
                }
            };

            fetchUrl();
        }
    }, [shortCode, router]);

    return <div>Redirecting...</div>;
}