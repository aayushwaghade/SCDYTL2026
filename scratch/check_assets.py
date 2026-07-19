import os
import re

files_to_check = [
    'data/team.ts',
    'data/speakers.ts',
    'data/tickets.ts',
    'components/sections/CommunityPartners.tsx',
    'components/sections/Hero.tsx',
    'components/sections/About.tsx',
    'components/sections/Venue.tsx',
    'components/cards/SpeakerCard.tsx',
    'components/cards/ProfileCard.tsx'
]

missing = []
for fpath in files_to_check:
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            matches = re.findall(r'["\'](/[^"\']+\.(?:png|jpg|jpeg|svg|webp))["\']', content)
            for m in set(matches):
                local_path = os.path.join('public', m.lstrip('/'))
                if not os.path.exists(local_path):
                    missing.append((fpath, m, local_path))

print(f"Missing assets check result: {len(missing)} missing files.")
for fpath, m, local_path in missing:
    print(f"  [MISSING] in {fpath}: {m} -> {local_path}")
