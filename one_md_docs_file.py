import os


def find_md_files(root_folder, skip_folders=None):
    md_files = []
    if skip_folders is None:
        skip_folders = []

    for root, dirs, files in os.walk(root_folder):
        for folder_to_skip in skip_folders:
            if folder_to_skip in dirs:
                dirs.remove(folder_to_skip)  # Skip the specified folder
        for file in files:
            if file.endswith('.md'):
                _file = os.path.join(root, file)
                print(_file)
                md_files.append(_file)
    return md_files


# def merge_md_files(md_files, output_file):
#     with open(output_file, 'w', encoding='utf-8') as merged_file:
#         for md_file in md_files:
#             with open(md_file, 'r', encoding='utf-8') as source_file:
#                 merged_file.write(source_file.read())
#                 merged_file.write('\n\n')  # Add a blank line between merged files


def merge_md_files(md_files, output_file, max_size):
    current_file_index = 0
    current_file_size = 0
    current_output_file = f"{output_file}-{current_file_index}.md"

    def write_to_new_file(merged_file, data):
        merged_file.write(data)

    with open(current_output_file, 'w', encoding='utf-8') as merged_file:
        for md_file in md_files:
            with open(md_file, 'r', encoding='utf-8') as source_file:
                content = source_file.read()
                content_size = len(content.encode('utf-8'))  # Get size in bytes

                # Check if writing the current file would exceed the max_size
                if current_file_size + content_size > max_size:
                    # Close the current file and start a new one
                    merged_file.close()
                    current_file_index += 1
                    current_output_file = f"{output_file}-{current_file_index}.md"
                    merged_file = open(current_output_file, 'w', encoding='utf-8')
                    current_file_size = 0  # Reset the size for the new file

                # Write content and update file size
                write_to_new_file(merged_file, content + '\n\n')
                current_file_size += content_size

    print(f"Files were merged into {current_file_index + 1} files.")


if __name__ == "__main__":
    root_folder = "docs/docs"  # Replace with the path to your folder
    output_file = "documentation.md"  # Name of the merged output file
    skip_folders = ['javascripts']  # Specify folders to skip (e.g., 'ai')

    md_files = find_md_files(root_folder, skip_folders)

    if md_files:
        merge_md_files(md_files, output_file, max_size=100000)
        print(f"Merged {len(md_files)} .md files into {output_file}")
    else:
        print("No .md files found in the specified folder.")
