import glob, os

for filepath in glob.glob('/home/krishna-gupta/Desktop/MIDTOWN/admin/src/app/dashboard/discover/*.tsx'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    content = content.replace("prev =>", "(prev: any) =>")
    
    with open(filepath, 'w') as f:
        f.write(content)

print("Fixed 'prev' type implicitly has an 'any' type in all files")
