export default function ReviewCard({ review, index = 0 }) {
  return (
    <div
      className="bg-cream border border-bark/8 rounded-2xl p-6 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src={review.avatar}
          alt={review.user}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-bark">{review.user}</p>
          <p className="text-xs text-stone">{review.pet}</p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < review.stars ? 'text-clay' : 'text-sand'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-sm text-bark/80 leading-relaxed">"{review.text}"</p>

      <div className="mt-4 rounded-xl overflow-hidden">
        <img
          src={review.petImg}
          alt={review.pet}
          loading="lazy"
          className="w-full h-36 object-cover"
        />
      </div>
    </div>
  )
}
