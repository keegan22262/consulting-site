import os
import re
import glob

def run():
    ignore_dirs = {'.git', 'node_modules', '.next', 'coverage', '.venv', 'python_env'}
    
    # 1. FILE TREE
    file_tree = []
    all_files = []
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        level = root.replace('.', '').count(os.sep)
        indent = ' ' * 4 * (level)
        file_tree.append(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            file_tree.append(f"{subindent}{f}")
            all_files.append(os.path.relpath(os.path.join(root, f), '.'))
            
    # 10. ENV VARIABLES
    env_vars = set()
    for fpath in all_files:
        if fpath.endswith(('.ts', '.tsx', '.js', '.jsx')):
            try:
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = re.findall(r'process\.env\.([A-Z0-9_]+)', content)
                    env_vars.update(matches)
            except Exception:
                pass
                
    # 9. IMAGE ASSETS
    image_assets = [f for f in all_files if f.startswith('public') and re.search(r'\.(png|jpe?g|gif|svg|webp|ico)$', f, re.I)]
    
    # 7. COMPONENT INVENTORY
    components = []
    for f in all_files:
        if ('components' in f or 'src/components' in f or 'components-v2' in f) and f.endswith('.tsx'):
            components.append(f)
            
    # Write report
    with open('audit_report.md', 'w', encoding='utf-8') as f:
        f.write("# FILE TREE\n```\n")
        f.write("\n".join(file_tree[:300]))  # limit tree to not blow up
        f.write("\n... (truncated for size)\n```\n\n")
        
        f.write("# IMAGE ASSETS\n")
        f.write("\n".join(f"- {img}" for img in image_assets))
        f.write("\n\n")
        
        f.write("# ENVIRONMENT VARIABLES\n")
        f.write("\n".join(f"- {e}" for e in sorted(env_vars)))
        f.write("\n\n")
        
        f.write("# COMPONENT INVENTORY\n")
        f.write("\n".join(f"- {c}" for c in components))
        f.write("\n\n")
        
run()
