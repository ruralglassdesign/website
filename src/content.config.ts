import { defineCollection, z } from 'astro:content';

export const collections = {
	work: defineCollection({
		// Load Instagram posts from the REST API
		loader: async () => {
			const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${import.meta.env.VITE_ACCESS_TOKEN}`);
			const data = await response.json();
			// Must return an array of entries with an id property, or an object with IDs as keys and entries as values
			return data.data.filter((post: { media_type: string; }) => post.media_type !== 'VIDEO')
		  },
		schema: z.object({
			id: z.string(),
			caption: z.string(),
			media_type: z.string(),
			media_url: z.string(),
			permalink: z.string(),
		}),
	}),
};
