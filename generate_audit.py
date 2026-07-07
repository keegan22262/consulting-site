import os
import re

def main():
    ignore_dirs = {'.git', 'node_modules', '.next', 'coverage', '.venv', 'python_env', '.vercel', '.vscode', '.sixth'}
    
    file_tree = []
    all_files = []
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        level = root.replace('.', '').count(os.sep)
        indent = '  ' * (level)
        folder_name = os.path.basename(root) if root != '.' else '.'
        file_tree.append(f"{indent}{folder_name}/")
        subindent = '  ' * (level + 1)
        for f in files:
            file_tree.append(f"{subindent}{f}")
            all_files.append(os.path.normpath(os.path.join(root, f)).replace('\\', '/'))
            
    # ENV VARS
    env_vars = set()
    for f in all_files:
        if f.endswith(('.ts', '.tsx', '.js', '.jsx')):
            try:
                with open(f, 'r', encoding='utf-8') as file:
                    content = file.read()
                    matches = re.findall(r'process\.env\.([A-Z0-9_]+)', content)
                    env_vars.update(matches)
            except: pass

    with open('audit_report.txt', 'w', encoding='utf-8') as f:
        f.write("=== FILE TREE ===\n")
        f.write("\n".join(file_tree))
        f.write("\n\n=== ENV VARS ===\n")
        f.write(", ".join(sorted(env_vars)))
        f.write("\n\n=== COMPONENTS ===\n")
        for file in all_files:
            if '/components' in file or 'components-v2' in file:
                f.write(f"{file}\n")

if __name__ == '__main__':
    main()
