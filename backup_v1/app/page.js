import { scanResources } from '../lib/scanResources'
import HomePage from '../components/HomePage'

export default function Page() {
    const data = scanResources()
    return <HomePage departments={data.departments} />
}
