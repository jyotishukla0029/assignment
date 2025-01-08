export default async function Blog({params}: {
    params: Promise<{ id: string }>
}) {
    const {id} = (await params)

    return <div>
        blog detail {id}
    </div>
}