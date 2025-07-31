import Url from '@/models/Url';
import { connectToDB } from '@/lib/db';

export default async function handler(req, res) {
    const { shortId } = req.query;
    
    try {
        await connectToDB();
        const url = await Url.findOneAndUpdate(
            { shortCode: shortId },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.status(200).json({ originalUrl: url.originalUrl });
    } catch (error) {
        console.error('Redirect error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}