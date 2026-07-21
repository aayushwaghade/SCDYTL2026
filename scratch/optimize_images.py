import os
from PIL import Image

def optimize_image(filepath):
    try:
        size_before = os.path.getsize(filepath)
        # Only process if > 100KB
        if size_before < 100 * 1024:
            return

        with Image.open(filepath) as img:
            # Convert RGBA to RGB if saving as JPEG
            ext = os.path.splitext(filepath)[1].lower()
            
            # Max width / height 1920px
            max_dim = 1920
            if img.width > max_dim or img.height > max_dim:
                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)

            if ext in ['.jpg', '.jpeg']:
                if img.mode in ('RGBA', 'P', 'LA'):
                    img = img.convert('RGB')
                img.save(filepath, 'JPEG', quality=82, optimize=True)
            elif ext == '.png':
                # If PNG is large and has no transparency or can be compressed
                if img.mode == 'RGBA':
                    # Save PNG with optimization
                    img.save(filepath, 'PNG', optimize=True)
                else:
                    img.save(filepath, 'PNG', optimize=True)

        size_after = os.path.getsize(filepath)
        saved = size_before - size_after
        if saved > 0:
            print(f"Optimized {os.path.basename(filepath)}: {size_before/1024:.1f}KB -> {size_after/1024:.1f}KB (Saved {saved/1024:.1f}KB)")
    except Exception as e:
        print(f"Skipped {filepath}: {e}")

def main():
    public_dir = r"d:\Antigraity Projects\SCD Website final Pranav\public"
    for root, dirs, files in os.walk(public_dir):
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                optimize_image(os.path.join(root, f))

if __name__ == "__main__":
    main()
