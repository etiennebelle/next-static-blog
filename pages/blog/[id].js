import Link from "next/link";

export default function Post({ post }) {
    return (
        <>
            <Link href='/'>Revenir à l'accueil</Link>
            <main>
                <h1>{ post.title }</h1>
                <p>{ post.body }</p>
            </main>
        </>
    )
}

export async function getStaticPaths() {
	const res = await fetch(
		'https://jsonplaceholder.typicode.com/posts?_limit=5'
	);
	const posts = await res.json();

	return {
        paths: posts.map(post => ({
            params: {id: post.id.toString()}
        })),
        fallback: false,
	};
}

export async function getStaticProps({params}) {
    const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${params.id}`
	);
	const post = await res.json();

	return {
		props: {
			post
		},
	};
}