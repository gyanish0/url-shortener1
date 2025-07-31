// pages/api/shorten.js
import { connectToDB } from '../../lib/db';
import { nanoid } from 'nanoid';
import Url from '../../models/Url';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { originalUrl } = req.body;

    try {
        await connectToDB();
        const shortCode = nanoid(6); 
        const url = new Url({ originalUrl, shortCode });
        await url.save();

        res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}