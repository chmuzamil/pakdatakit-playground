import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PassportPlatesPlayground } from './pages/PassportPlatesPlayground'
import { PostOfficesPlayground } from './pages/PostOfficesPlayground'
import { CodChecksPlayground } from './pages/CodChecksPlayground'
import { CourierPlayground } from './pages/CourierPlayground'
import { BillsPlayground } from './pages/BillsPlayground'
import { SalesTaxPlayground } from './pages/SalesTaxPlayground'
import { IncomeTaxPlayground } from './pages/IncomeTaxPlayground'
import { FbrInvoicePlayground } from './pages/FbrInvoicePlayground'
import { SlugifyPlayground } from './pages/SlugifyPlayground'
import { AddressPlayground } from './pages/AddressPlayground'
import { CNICPlayground } from './pages/CNICPlayground'
import { CurrencyPlayground } from './pages/CurrencyPlayground'
import { FakerPlayground } from './pages/FakerPlayground'
import { FlutterPlayground } from './pages/FlutterPlayground'
import { FormInputsPlayground } from './pages/FormInputsPlayground'
import { GeoPlayground } from './pages/GeoPlayground'
import { HijriPlayground } from './pages/HijriPlayground'
import { HolidaysPlayground } from './pages/HolidaysPlayground'
import { IBANPlayground } from './pages/IBANPlayground'
import { NumbersPlayground } from './pages/NumbersPlayground'
import { PhonePlayground } from './pages/PhonePlayground'
import { PostalPlayground } from './pages/PostalPlayground'
import { RaastPlayground } from './pages/RaastPlayground'
import { TaxPlayground } from './pages/TaxPlayground'
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
        <Route path="holidays" element={<HolidaysPlayground />} />
        <Route path="tax" element={<TaxPlayground />} />
        <Route path="forms" element={<FormInputsPlayground />} />
        <Route path="faker" element={<FakerPlayground />} />
        <Route path="flutter" element={<FlutterPlayground />} />
        <Route path="numbers" element={<NumbersPlayground />} />
        <Route path="raast" element={<RaastPlayground />} />
        <Route path="passport-plates" element={<PassportPlatesPlayground />} />
        <Route path="post-offices" element={<PostOfficesPlayground />} />
        <Route path="cod" element={<CodChecksPlayground />} />
        <Route path="courier" element={<CourierPlayground />} />
        <Route path="bills" element={<BillsPlayground />} />
        <Route path="sales-tax" element={<SalesTaxPlayground />} />
        <Route path="income-tax" element={<IncomeTaxPlayground />} />
        <Route path="fbr-invoice" element={<FbrInvoicePlayground />} />
        <Route path="slugify" element={<SlugifyPlayground />} />
      </Route>
    </Routes>
  )
}
