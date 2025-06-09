import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-gray-600 mb-8">Page not found</p>
      <Link href="/" className="btn-primary">
        Go back home
      </Link>
    </div>
  )
}