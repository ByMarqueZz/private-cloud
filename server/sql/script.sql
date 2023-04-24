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

INSERT INTO missions (name, description, frame_id, points, max_value, callback) VALUES ('Sube', 'Sube tu primer archivo', 1, 200, 1, 'upload'),('Crea', 'Crea una carpeta', 1, 200, 1, 'Carpeta creada'),('Comparte', 'Comparte un archivo o carpeta con otro usuario', 1, 200, 1, 'Compartido'), ('Edita', 'Cambia tu imagen de perfil', 1, 200, 1, 'Foto de perfil actualizada'), ('Sube', 'Sube 10 archivos', 2, 200, 10, 'upload2'), ('Crea', 'Crea 5 carpetas', 2, 200, 5, 'Carpeta creada2'), ('Comparte', 'Comparte 5 archivos o carpetas con otros usuarios', 2, 200, 5, 'Compartido2'), ('Edita', 'Cambia la configuración de privacidad de 5 archivos o carpetas', 2, 200, 5, 'Carpeta Editada2'), ('Crea', 'Crea 5 archivos desde 0', 2, 200, 5, 'Archivo creado2'), ('Sube', 'Sube 50 archivos', 3, 200, 50, 'upload3'), ('Crea', 'Crea 10 carpetas con contraseñas', 3, 200, 10, 'Carpeta con contraseña creada3'), ('Comparte', 'Comparte 10 archivos o carpetas con otros usuarios', 3, 200, 10, 'Compartido3'), ('Edita', 'Cambia la configuración de privacidad de 10 archivos o carpetas', 3, 200, 10, 'Carpeta Editada3'), ('Crea', 'Crea 10 archivos desde 0', 3, 200, 10, 'Archivo creado3'), ('Sube', 'Sube 75 archivos', 4, 200, 75, 'upload4'),  ('Crea', 'Crea 15 carpetas con contraseñas', 4, 200, 15, 'Carpeta con contraseña creada4'), ('Comparte', 'Comparte 20 archivos o carpetas con otros usuarios', 4, 200, 20, 'Compartido4'), ('Edita', 'Cambia la configuración de privacidad de 20 archivos o carpetas', 4, 200, 20, 'Carpeta Editada4'), ('Crea', 'Crea 20 archivos desde 0', 4, 200, 20, 'Archivo creado4'), ('Sube', 'Sube 100 archivos', 5, 200, 100, 'upload5'), ('Crea', 'Crea 30 carpetas con contraseñas', 5, 200, 30, 'Carpeta con contraseña creada5'), ('Comparte', 'Comparte 30 archivos o carpetas con otros usuarios', 5, 200, 30, 'Compartido5'), ('Edita', 'Cambia la configuración de privacidad de 30 archivos o carpetas', 5, 200, 30, 'Carpeta Editada5'), ('Crea', 'Crea 20 archivos desde 0', 5, 200, 20, 'Archivo creado5'), ('Sube', 'Sube 150 archivos', 6, 200, 150, 'upload6'), ('Crea', 'Crea 50 carpetas con contraseñas', 6, 200, 50, 'Carpeta con contraseña creada6'), ('Comparte', 'Comparte 50 archivos o carpetas con otros usuarios', 6, 200, 50, 'Compartido6'), ('Edita', 'Cambia la configuración de privacidad de 50 archivos o carpetas', 6, 200, 50, 'Carpeta Editada6'), ('Crea', 'Crea 50 archivos desde 0', 6, 200, 50, 'Archivo creado6'), ('Sube', 'Sube 200 archivos', 7, 200, 200, 'upload7'), ('Crea', 'Crea 100 carpetas con contraseñas', 7, 200, 100, 'Carpeta con contraseña creada7'), ('Comparte', 'Comparte 100 archivos o carpetas con otros usuarios', 7, 200, 100, 'Compartido7'), ('Edita', 'Cambia la configuración de privacidad de 100 archivos o carpetas', 7, 200, 100, 'Carpeta Editada7'), ('Crea', 'Crea 100 archivos desde 0', 7, 200, 100, 'Archivo creado7'), ('Sube', 'Sube 300 archivos', 8, 200, 300, 'upload8'), ('Crea', 'Crea 200 carpetas con contraseñas', 8, 200, 200, 'Carpeta con contraseña creada8'), ('Comparte', 'Comparte 200 archivos o carpetas con otros usuarios', 8, 200, 200, 'Compartido8'), ('Edita', 'Cambia la configuración de privacidad de 200 archivos o carpetas', 8, 200, 200, 'Carpeta Editada8'), ('Crea', 'Crea 200 archivos desde 0', 8, 200, 200, 'Archivo creado8');

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