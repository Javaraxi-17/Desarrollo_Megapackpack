# Variables
IMAGE_NAME=megapack-api
VERSION=0.0.1
REGISTRY=ancordss

# Construir la imagen de Docker
build:
	@echo "Construyendo la imagen Docker..."
	docker build -t $(IMAGE_NAME):$(VERSION) .

# Etiquetar la imagen con el registro
tag:
	@echo "Etiquetando la imagen..."
	docker tag $(IMAGE_NAME):$(VERSION) $(REGISTRY)/$(IMAGE_NAME):$(VERSION)

# Subir la imagen al registro
push: tag
	@echo "Subiendo la imagen al registro..."
	docker push $(REGISTRY)/$(IMAGE_NAME):$(VERSION)

# Comando para limpiar las imágenes locales
clean:
	@echo "Limpiando las imágenes Docker locales..."
	docker rmi $(IMAGE_NAME):$(VERSION)

# Ayuda para el uso de comandos
help:
	@echo "Comandos disponibles:"
	@echo "  make build      - Construir la imagen Docker"
	@echo "  make tag        - Etiquetar la imagen para el registro"
	@echo "  make push       - Subir la imagen al registro"
	@echo "  make clean      - Eliminar la imagen local"
