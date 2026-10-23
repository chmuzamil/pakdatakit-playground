import { useState } from 'react'
import { Card } from '../components/Card'
import { CodePreview } from '../components/CodePreview'
import { PlaygroundShell } from '../components/PlaygroundShell'
import { TabBar } from '../components/TabBar'

const tabs = [
  { id: 'flutter', label: 'Flutter widgets' },
  { id: 'dart', label: 'Dart' },
] as const

type Tab = (typeof tabs)[number]['id']

const flutterCode = `# pubspec.yaml
dependencies:
  pakdatakit_flutter: ^0.1.0

// Dart
import 'package:pakdatakit_flutter/pakdatakit_flutter.dart';

Form(
  child: Column(children: [
    CnicField(
      decoration: const InputDecoration(labelText: 'CNIC'),
      onStateChanged: (state, info) => print('\${state.value} \${info?.province}'),
    ),
    PhoneField(decoration: const InputDecoration(labelText: 'Mobile')),
    IbanField(decoration: const InputDecoration(labelText: 'IBAN')),
    RaastQr(iban: 'PK36SCBL0000001123456702', size: 200),
  ]),
);

// Or add formatting and validation to your own TextFormField:
TextFormField(
  inputFormatters: [CnicInputFormatter()],
  validator: PakValidators.cnic(),
);`

const dartCode = `# pubspec.yaml
dependencies:
  pakdatakit: ^2.2.0

// Dart: same functions and data as the npm and Python packages
import 'package:pakdatakit/pakdatakit.dart';

validateCNIC('35202-1234567-1');      // true
getCNICInfo('35202-1234567-1')?.province; // "Punjab"
analyzePhone('0300 1234567').network;    // NetworkName.jazz
getBankInfo('PK36SCBL0000001123456702')?.name;
amountInWords(125000, cheque: true);     // "Rupees One Lakh Twenty-Five Thousand Only"
createRaastP2PQr(iban: 'PK36SCBL0000001123456702');

// Works in Flutter (including web), Dart servers and CLI tools.
// Checked against the TypeScript library with 12,000+ shared test cases.`

export function FlutterPlayground() {
  const [tab, setTab] = useState<Tab>('flutter')

  return (
    <PlaygroundShell
      title="Flutter & Dart"
      description="The same toolkit for Flutter apps: fields that format as you type, form validators and a Raast QR widget. The demo below is a real Flutter web app built with pakdatakit_flutter."
      input={
        <>
          <TabBar tabs={tabs} active={tab} onChange={setTab} />
          {tab === 'flutter' ? (
            <Card
              title="pakdatakit_flutter"
              description="CnicField, PhoneField and IbanField format as you type, keep the cursor in place, and only show an error once a value can no longer become valid."
            >
              <ul className="space-y-1 text-sm text-text-muted">
                <li>
                  <code className="text-accent">CnicInputFormatter</code>,{' '}
                  <code className="text-accent">PhoneInputFormatter</code>,{' '}
                  <code className="text-accent">IbanInputFormatter</code>
                </li>
                <li>
                  <code className="text-accent">PakValidators</code>: cnic, phone, iban, ntn,
                  strn, landline
                </li>
                <li>
                  <code className="text-accent">RaastQr</code> widget
                </li>
              </ul>
              <a
                href="https://pub.dev/packages/pakdatakit_flutter"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-accent hover:underline"
              >
                pakdatakit_flutter on pub.dev →
              </a>
            </Card>
          ) : (
            <Card
              title="pakdatakit for Dart"
              description="Pure Dart with no dependencies: every validator, formatter and dataset from the npm package."
            >
              <a
                href="https://pub.dev/packages/pakdatakit"
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-sm text-accent hover:underline"
              >
                pakdatakit on pub.dev →
              </a>
            </Card>
          )}
        </>
      }
      output={
        <Card title="Live Flutter demo" description="Runs pakdatakit_flutter compiled for the web.">
          <iframe
            src="/flutter-demo/index.html"
            title="pakdatakit_flutter live demo"
            loading="lazy"
            className="h-[min(80dvh,760px)] min-h-[480px] w-full rounded-md border border-border bg-surface"
          />
        </Card>
      }
      code={<CodePreview code={tab === 'flutter' ? flutterCode : dartCode} />}
    />
  )
}
