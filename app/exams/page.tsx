import { Suspense } from 'react'
import ExamsSection from '@/components/pages/Exams'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ExamsSection />
    </Suspense>
  )
}
