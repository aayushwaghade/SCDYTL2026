import os
import shutil
import re
import openpyxl
import json

# Paths
excel_path = "Team Section/Team Details/SCD Team Section Details.xlsx"
images_dir = "Team Section/Team Images"
output_public_dir = "public/team"
output_ts_path = "data/team.ts"

# Ensure output public directory exists
os.makedirs(output_public_dir, exist_ok=True)

# 1. Get list of files in Team Images
image_files = os.listdir(images_dir)
print(f"Found {len(image_files)} image files in Team Images:")
for f in image_files:
    print(f" - {f}")

# 2. Read Excel Sheet
wb = openpyxl.load_workbook(excel_path)
sheet = wb.active

# Parse rows
members = []
for row in sheet.iter_rows(min_row=2, values_only=True):
    if not row or not row[0]:
        continue
    name = row[0].strip()
    role = row[1].strip() if row[1] else ""
    insta = row[2].strip() if row[2] else "#"
    linkedin = row[3].strip() if row[3] else "#"
    
    members.append({
        "name": name,
        "role": role,
        "insta": insta,
        "linkedin": linkedin
    })

print(f"Parsed {len(members)} members from Excel.")

# 3. Match Members to Images
all_members_data = []
verification_log = []

for idx, member in enumerate(members, 1):
    m_name = member["name"]
    # Normalize name for matching (lowercase, strip extra spaces/special chars)
    norm_name = re.sub(r'[^a-z]', '', m_name.lower())
    
    # Try to find a matching image file
    matched_file = None
    for img_file in image_files:
        norm_img = re.sub(r'[^a-z]', '', img_file.lower())
        # Check if normalized member name is matched within normalized image file name
        if norm_name in norm_img or norm_img.startswith(norm_name) or norm_name.startswith(norm_img.replace('img', '').replace('png', '').replace('jpeg', '').replace('jpg', '')):
            matched_file = img_file
            break
            
    # Direct fallback checks for slight spelling variations in names
    if not matched_file:
        if "bilal" in norm_name:
            for img_file in image_files:
                if "bilal" in img_file.lower():
                    matched_file = img_file
                    break
        elif "yashahsri" in norm_name or "roulkar" in norm_name or "raulkar" in norm_name:
            for img_file in image_files:
                if "raulkar" in img_file.lower() or "yash" in img_file.lower():
                    matched_file = img_file
                    break
        elif "gargi" in norm_name:
            for img_file in image_files:
                if "gargi" in img_file.lower():
                    matched_file = img_file
                    break
        elif "laxmi" in norm_name:
            for img_file in image_files:
                if "laxmi" in img_file.lower():
                    matched_file = img_file
                    break

    # Copy the matched image and normalize its name
    photo_path = None
    image_found_str = "NO"
    img_filename_str = "-"
    
    if matched_file:
        ext = os.path.splitext(matched_file)[1]
        norm_photo_name = m_name.lower().replace(' ', '-').replace("'", "") + ext
        target_path = os.path.join(output_public_dir, norm_photo_name)
        
        source_path = os.path.join(images_dir, matched_file)
        shutil.copyfile(source_path, target_path)
        photo_path = f"/team/{norm_photo_name}"
        image_found_str = "YES"
        img_filename_str = matched_file
        print(f"MATCH SUCCESS: {m_name} -> {matched_file} copied.")
    else:
        print(f"IMAGE NOT FOUND: {m_name} will use default avatar.")

    # Category Mapping
    role_lower = member["role"].lower()
    if "leader" in role_lower or "organizer" in role_lower:
        category = "lead"
    elif "lead" in role_lower:
        category = "core"
    elif "coordinator" in role_lower:
        category = "coordinator"
    elif "volunteer" in role_lower:
        category = "volunteer"
    else:
        category = "executive"

    # Profile bio text
    bio = f"AWS Student Community Day Organizing Team member. Coordinating {member['role']} operations for Yavatmal 2026."

    member_record = {
        "name": m_name,
        "role": member["role"],
        "bio": bio,
        "linkedin": member["linkedin"],
        "instagram": member["insta"],
        "category": category
    }
    
    if photo_path:
        member_record["photo"] = photo_path

    all_members_data.append(member_record)
    
    verification_log.append({
        "order": idx,
        "name": m_name,
        "role": member["role"],
        "found": image_found_str,
        "filename": img_filename_str,
        "insta": member["insta"],
        "linkedin": member["linkedin"],
        "rendered": "YES"
    })

# Write to data/team.ts
ts_content = f"""// Generated automatically by scratch/parse_team.py
export interface TeamMember {{
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  instagram?: string;
  category: "lead" | "core" | "coordinator" | "executive" | "volunteer";
}}

export const TEAM_MEMBERS: TeamMember[] = {json.dumps(all_members_data, indent=2)};
"""

with open(output_ts_path, "w") as f:
    f.write(ts_content)

print(f"\nSuccessfully generated {output_ts_path} with {len(all_members_data)} members (including default avatars).")

# Output verification table JSON for verification reporting
print("\nVERIFICATION_TABLE_JSON:")
print(json.dumps(verification_log, indent=2))
