import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AddressPlayground } from './pages/AddressPlayground'
import { CNICPlayground } from './pages/CNICPlayground'
import { CurrencyPlayground } from './pages/CurrencyPlayground'
import { GeoPlayground } from './pages/GeoPlayground'
import { HijriPlayground } from './pages/HijriPlayground'
import { IBANPlayground } from './pages/IBANPlayground'
import { PhonePlayground } from './pages/PhonePlayground'
import { PostalPlayground } from './pages/PostalPlayground'
import { TextPlayground } from './pages/TextPlayground'
import { WhatsAppPlayground } from './pages/WhatsAppPlayground'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/cnic" replace />} />
        <Route path="cnic" element={<CNICPlayground />} />
        <Route path="phone" element={<PhonePlayground />} />
        <Route path="whatsapp" element={<WhatsAppPlayground />} />
        <Route path="geo" element={<GeoPlayground />} />
        <Route path="postal" element={<PostalPlayground />} />
        <Route path="address" element={<AddressPlayground />} />
        <Route path="currency" element={<CurrencyPlayground />} />
        <Route path="iban" element={<IBANPlayground />} />
        <Route path="text" element={<TextPlayground />} />
        <Route path="hijri" element={<HijriPlayground />} />
      </Route>
    </Routes>
  )
}
