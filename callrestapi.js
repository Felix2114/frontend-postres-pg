var url = "https://postres-api-felix.onrender.com/api/postres";

function postPostre() {

    console.log(url);

    var myNombre = $('#nombre').val();
    var myDescripcion = $('#descripcion').val();
    var myCategoria = $('#categoria').val();
    var myPrecio = $('#precio').val();
    var myStock = $('#stock').val();

    var mypostre = {
        nombre: myNombre,
        descripcion: myDescripcion,
        categoria: myCategoria,
        precio: myPrecio,
	stock: myStock
    };
    console.log(mypostre);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            $('#resultado').html(JSON.stringify(data.postre));
        },
        data: JSON.stringify(mypostre)
    });
}
function getPostre() {
    console.log(url);

    $.getJSON(url, function(json) {
        console.log(json);

        var arrPostres = json.postre;

        var htmlTablePostres = '<table border="1">';
        htmlTablePostres += '<tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>';

        arrPostres.forEach(function(item) {
            console.log(item);
            htmlTablePostres += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td><input type="text" id="nombre_' + item.id + '" value="' + item.nombre + '"></td>' +
                '<td><input type="text" id="descripcion_' + item.id + '" value="' + item.descripcion + '"></td>' +
                '<td><input type="text" id="categoria_' + item.id + '" value="' + item.categoria + '"></td>' +
                '<td><input type="number" id="precio_' + item.id + '" value="' + item.precio + '"></td>' +
                '<td><input type="number" id="stock_' + item.id + '" value="' + item.stock + '"></td>' +
                '<td>' +
                    '<button onclick="updatePostre(' + item.id + ')">Actualizar</button>' +
                    '<button onclick="deletePostre(' + item.id + ')">Eliminar</button>' +
                '</td>' +
            '</tr>';
        });

        htmlTablePostres += '</table>';

        $('#resultado').html(htmlTablePostres);
    });
}





function updatePostre(id) {
    var myNombre = $('#nombre_' + id).val();
    var myDescripcion = $('#descripcion_' + id).val();
    var myCategoria = $('#categoria_' + id).val();
    var myPrecio = $('#precio_' + id).val();
    var myStock = $('#stock_' + id).val();

    var myPostre = {
        nombre: myNombre,
        descripcion: myDescripcion,
        categoria: myCategoria,
        precio: myPrecio,
        stock: myStock
    };

    $.ajax({
        url: url + '/' + id,
        type: 'put',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(myPostre),
        success: function (data) {
            alert('Postre actualizado correctamente');
            getPostre(); // refresca la tabla
        },
        error: function (xhr, status, error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el postre');
        }
    });
}

function deletePostre(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este postre?')) return;

    $.ajax({
        url: url + '/' + id,
        type: 'delete',
        success: function (data) {
            alert('Postre eliminado correctamente');
            getPostre(); // refresca la tabla
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el postre');
        }
    });
}

