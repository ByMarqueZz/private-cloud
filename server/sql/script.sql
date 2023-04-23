CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) NOT NULL,
    registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follows (
    id int PRIMARY KEY AUTO_INCREMENT,
    follower_id int NOT NULL,
    following_id int NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (following_id) REFERENCES users(id)
);

CREATE TABLE files (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    permissions BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE icons (
    id int PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL
);

INSERT INTO icons (type, path) VALUES ('folder', 'folder.png'), ('txt', '/assets/nota.png'), ('md', '/assets/markdown.png'), ('pdf', '/assets/pdf.png'), ('docx', '/assets/docx.png'), ('doc', '/assets/docx.png'), ('pptx', '/assets/pptx.png'), ('ppt', '/assets/pptx.png'), ('xlsx', '/assets/xlsx.png'), ('xls', '/assets/xlsx.png'), ('html', '/assets/html.png'), ('htm', '/assets/html.png'), ('css', '/assets/css.png'), ('js', '/assets/js.png'), ('java', '/assets/java.png'), ('php', '/assets/php.png'), ('sass', '/assets/sass.png'), ('scss', '/assets/sass.png'), ('json', '/assets/json.png'), ('ico', '/assets/ico.png'), ('svg', '/assets/svg.png'), ('gitignore', '/assets/gitignore.png'), ('firebase', '/assets/firebase.png'), ('firebaserc', '/assets/firebase.png'), ('sql', '/assets/sql.png'), ('png', '/assets/png.png'), ('jpg', '/assets/png.png'), ('jpeg', '/assets/png.png'), ('zip', '/assets/zip.png'), ('rar', '/assets/rar.png'), ('7z', '/assets/rar.png'), ('mp3', '/assets/mp3.png'), ('mp4', '/assets/mp4.png'), ('avi', '/assets/avi.png'), ('mkv', '/assets/mkv.png'), ('exe', '/assets/exe.png'), ('bat', '/assets/bat.png'), ('py', '/assets/py.png'), ('c', '/assets/c.png'), ('cpp', '/assets/cpp.png'), ('cs', '/assets/cs.png'), ('go', '/assets/go.png'), ('rb', '/assets/rb.png'), ('swift', '/assets/swift.png'), ('xml', '/assets/xml.png'), ('yml', '/assets/yml.png'), ('yaml', '/assets/yml.png');

CREATE TABLE frames (
    id int PRIMARY KEY AUTO_INCREMENT,
    level VARCHAR(255) NOT NULL,
    style VARCHAR(255) NOT NULL
);

INSERT INTO frames(level, style) VALUES('/assets/profile/1-5.png', 'estilo-marco-1'), ('/assets/profile/5-10.png', 'estilo-marco-2'), ('/assets/profile/10-15.png', 'estilo-marco-3'), ('/assets/profile/15-20.png', 'estilo-marco-2'), ('/assets/profile/20-25.png', 'estilo-marco-2'), ('/assets/profile/25-30.png', 'estilo-marco-2'), ('/assets/profile/30-35.png', 'estilo-marco-4'), ('/assets/profile/35-40.png', 'estilo-marco-5');

CREATE TABLE missions(
    id int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    frame_id int NOT NULL,
    points int NOT NULL,
    max_value int NOT NULL,
    callback VARCHAR(255) NOT NULL,
    FOREIGN KEY (frame_id) REFERENCES frames(id)
);

INSERT INTO missions (name, description, frame_id, points, max_value, callback) VALUES ('Sube', 'Sube tu primer archivo', 1, 200, 1, 'upload'),('Crea', 'Crea una carpeta', 1, 200, 1, 'Carpeta creada'),('Comparte', 'Comparte un archivo o carpeta con otro usuario', 1, 200, 1, 'Compartido'), ('Edita', 'Cambia la configuración de privacidad de un archivo o carpeta', 1, 200, 1, 'Carpeta Editada'), ('Edita', 'Cambia tu imagen de perfil', 1, 200, 1, 'Foto de perfil actualizada'), ('Sube', 'Sube 10 archivos', 2, 200, 10, 'upload2'), ('Crea', 'Crea 5 carpetas', 2, 200, 5, 'Carpeta creada2'), ('Comparte', 'Comparte 5 archivos o carpetas con otros usuarios', 2, 200, 5, 'Compartido2'), ('Edita', 'Cambia la configuración de privacidad de 5 archivos o carpetas', 2, 200, 5, 'Carpeta Editada2'), ('Crea', 'Crea 5 archivos desde 0', 2, 200, 5, 'Archivo creado2');

CREATE TABLE users_passed_missions (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    mission_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (mission_id) REFERENCES missions(id)
);

CREATE TABLE progress (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    do VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);