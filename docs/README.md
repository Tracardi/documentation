# To push latest update

cd docs
mike deploy --push --update-aliases 1.1.x latest
# Caution - Requires python 3.11

If error: command not found: mike
pip install mike
pip install mkdocs-material


# Install
```
pip install -r docs/requirements.txt 
```


# Test
run in documentation/docs
```
docker run --rm -it -p 8100:8000 -v ${PWD}:/docs squidfunk/mkdocs-material:9.5.1
```

# Build
Type `mkdocs build` in folder / in tracardi-api (it must be single project, without attached tracardi, etc.)