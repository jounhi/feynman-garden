import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const profile = defineCollection({
	loader: glob({ base: './src/content/profile', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image().optional(),
			bio: z.string(),
			email: z.string().email().optional(),
			github: z.string().url().optional(),
			skills: z.array(z.string()).default([]),
			interests: z.array(z.string()).default([]),
		}),
});

const changelog = defineCollection({
	loader: glob({ base: './src/content/changelog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string().optional(),
		date: z.coerce.date(),
		categories: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, profile, changelog };
