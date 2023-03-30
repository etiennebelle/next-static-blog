import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home({ posts }) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setCount((c) => c + 1);
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<>
			<Head>
				<title>Mon premier blog NextJS</title>
			</Head>
			<main>
				<h1>Count: {count}</h1>
				<ul>
					{ posts.map((post) => (
						<Link href={ `/blog/${post.id}` } key={post.id}>
							<li>
								<h3>{post.id} — {post.title}</h3>
							</li>
						</Link>
					))}
				</ul>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		'https://jsonplaceholder.typicode.com/posts?_limit=5'
	);
	const posts = await res.json();

	return {
		props: {
			posts,
		},
	};
}
