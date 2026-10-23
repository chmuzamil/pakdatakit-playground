# pakdatakit_flutter demo

A small Flutter web app using [`pakdatakit_flutter`](https://pub.dev/packages/pakdatakit_flutter)
from pub.dev. The playground embeds it on the **Flutter & Dart** page (`/flutter`) in an iframe.

Vercel cannot build Flutter, so the compiled output in `public/flutter-demo/` is committed.
After changing `lib/main.dart` or upgrading `pakdatakit_flutter`, rebuild it from the
playground root and commit the result:

```bash
npm run build:flutter-demo
```

Run this from the real folder (`E:\Projects\pakdatakit-playground`), not through the
Desktop shortcut: Flutter fails to write assets through a junction. The script builds from
scratch with `--base-href /flutter-demo/` and leaves out the local CanvasKit copy, since
Flutter loads it from Google's CDN.
