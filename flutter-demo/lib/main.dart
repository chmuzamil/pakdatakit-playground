import 'package:flutter/material.dart';
import 'package:pakdatakit_flutter/pakdatakit_flutter.dart';

/// Live demo of pakdatakit_flutter, embedded in the PakDataKit playground.
/// Build: see flutter-demo/README.md.
void main() => runApp(const DemoApp());

const _surface = Color(0xFF0D1117);
const _raised = Color(0xFF161B22);
const _border = Color(0xFF30363D);
const _accent = Color(0xFF58A6FF);
const _muted = Color(0xFF8B949E);
const _success = Color(0xFF3FB950);
const _error = Color(0xFFF85149);

class DemoApp extends StatelessWidget {
  const DemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    final scheme = ColorScheme.fromSeed(
      seedColor: _accent,
      brightness: Brightness.dark,
    ).copyWith(surface: _surface, primary: _accent, error: _error);
    return MaterialApp(
      title: 'pakdatakit_flutter demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: scheme,
        scaffoldBackgroundColor: _surface,
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: _raised,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: _border),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: _border),
          ),
        ),
      ),
      home: const DemoForm(),
    );
  }
}

class DemoForm extends StatefulWidget {
  const DemoForm({super.key});

  @override
  State<DemoForm> createState() => _DemoFormState();
}

class _DemoFormState extends State<DemoForm> {
  final _formKey = GlobalKey<FormState>();
  final _ibanController = TextEditingController();

  InputState _cnicState = InputState.empty;
  String _cnicInfo = '';
  InputState _phoneState = InputState.empty;
  String _phoneInfo = '';
  InputState _ibanState = InputState.empty;
  String _bank = '';
  String _qrIban = 'PK36SCBL0000001123456702';

  @override
  void dispose() {
    _ibanController.dispose();
    super.dispose();
  }

  void _submit() {
    final valid = _formKey.currentState!.validate();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(valid ? 'All fields are valid' : 'Please fix the errors'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Text(
              'Flutter widgets from pakdatakit_flutter',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 4),
            const Text(
              'Type in the fields: they format as you type and only show an '
              'error once a value can no longer become valid.',
              style: TextStyle(color: _muted, fontSize: 13),
            ),
            const SizedBox(height: 20),
            CnicField(
              decoration: const InputDecoration(labelText: 'CNIC'),
              textInputAction: TextInputAction.next,
              onStateChanged: (state, info) => setState(() {
                _cnicState = state;
                _cnicInfo = info == null
                    ? ''
                    : '${info.province}, ${info.gender.value}';
              }),
            ),
            _Status(state: _cnicState, detail: _cnicInfo),
            const SizedBox(height: 12),
            PhoneField(
              decoration: const InputDecoration(labelText: 'Mobile number'),
              textInputAction: TextInputAction.next,
              onStateChanged: (state, info) => setState(() {
                _phoneState = state;
                _phoneInfo = info == null
                    ? ''
                    : '${info.formatted ?? ''} · ${info.network.value}';
              }),
            ),
            _Status(state: _phoneState, detail: _phoneInfo),
            const SizedBox(height: 12),
            IbanField(
              controller: _ibanController,
              decoration: const InputDecoration(labelText: 'IBAN'),
              onStateChanged: (state, info) => setState(() {
                _ibanState = state;
                _bank = info?.name ?? '';
                if (state == InputState.valid) _qrIban = _ibanController.text;
              }),
            ),
            _Status(state: _ibanState, detail: _bank),
            const SizedBox(height: 20),
            Align(
              alignment: Alignment.centerLeft,
              child: FilledButton(
                onPressed: _submit,
                child: const Text('Validate form'),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'RaastQr widget (uses the IBAN above once it is valid)',
              style: TextStyle(color: _muted, fontSize: 13),
            ),
            const SizedBox(height: 12),
            Center(
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: RaastQr(iban: _qrIban, size: 200),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Status extends StatelessWidget {
  const _Status({required this.state, required this.detail});

  final InputState state;
  final String detail;

  @override
  Widget build(BuildContext context) {
    final (label, color) = switch (state) {
      InputState.empty => ('Empty', _muted),
      InputState.incomplete => ('Keep typing…', _muted),
      InputState.valid => ('Valid', _success),
      InputState.invalid => ('Invalid', _error),
    };
    return Padding(
      padding: const EdgeInsets.only(top: 6, left: 4),
      child: Text(
        detail.isEmpty ? label : '$label · $detail',
        style: TextStyle(color: color, fontSize: 12),
      ),
    );
  }
}
