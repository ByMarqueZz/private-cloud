-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-01-2024 a las 10:21:58
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloudinghub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domain`
--

CREATE TABLE `domain` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `domain`
--

INSERT INTO `domain` (`id`, `idUser`, `type`, `url`, `created_at`, `updated_at`) VALUES
(89, 1, 'own', 'jointscounter.com', '2023-11-02 20:35:05', '2023-11-02 20:35:05'),
(90, 1, 'own', 'cloudinghub.com', '2023-11-02 20:35:25', '2023-11-02 20:35:25'),
(91, 1, 'free', 'cloud.cloudinghub.com', '2023-11-02 20:35:35', '2023-11-02 20:35:35'),
(95, 1, 'free', 'paco4cjji3cu.cloudinghub.com', '2024-01-22 20:33:05', '2024-01-22 20:33:05'),
(96, 1, 'free', 'paco4cjji3cu.cloudinghub.com', '2024-01-22 20:35:48', '2024-01-22 20:35:48'),
(97, 1, 'free', 'paco4cjji3cu.cloudinghub.com', '2024-01-22 20:46:14', '2024-01-22 20:46:14'),
(98, 1, 'free', 'pacoozqvv58o.cloudinghub.com', '2024-01-22 20:53:23', '2024-01-22 20:53:23'),
(99, 1, 'free', 'paquitopepe1gpr17xf.cloudinghub.com', '2024-01-22 21:08:31', '2024-01-22 21:08:31'),
(100, 1, 'free', 'holamundom1yblmu5.cloudinghub.com', '2024-01-22 21:11:17', '2024-01-22 21:11:17'),
(101, 1, 'free', 'pythonano41jba.cloudinghub.com', '2024-01-22 21:15:30', '2024-01-22 21:15:30'),
(102, 1, 'free', 'Pruebadefinitivaswzfqfgi.cloudinghub.com', '2024-01-22 21:21:06', '2024-01-22 21:21:06'),
(103, 1, 'free', 'katarinamcpkmnev.cloudinghub.com', '2024-01-22 21:25:19', '2024-01-22 21:25:19'),
(104, 1, 'free', 'pacofaxkeavj.cloudinghub.com', '2024-01-22 21:26:29', '2024-01-22 21:26:29'),
(105, 1, 'free', 'pepejlbilpiu.cloudinghub.com', '2024-01-22 21:28:53', '2024-01-22 21:28:53'),
(106, 1, 'free', 'atghjcztp.cloudinghub.com', '2024-01-22 21:29:09', '2024-01-22 21:29:09'),
(107, 1, 'free', 'aasotfmpjbh.cloudinghub.com', '2024-01-22 21:30:24', '2024-01-22 21:30:24'),
(108, 1, 'free', 'papasitaxwrlozzh.cloudinghub.com', '2024-01-22 21:32:42', '2024-01-22 21:32:42'),
(109, 1, 'free', 'paqiuitavtzkpibl.cloudinghub.com', '2024-01-22 21:33:14', '2024-01-22 21:33:14'),
(110, 1, 'free', 'pepiaxvixcanj.cloudinghub.com', '2024-01-22 21:37:41', '2024-01-22 21:37:41'),
(111, 1, 'free', 'almabsyeqnau.cloudinghub.com', '2024-01-22 22:02:55', '2024-01-22 22:02:55'),
(112, 1, 'free', 'papipgwqkjpl.cloudinghub.com', '2024-01-22 22:04:07', '2024-01-22 22:04:07'),
(113, 1, 'free', 'asqpozfnen.cloudinghub.com', '2024-01-22 22:05:16', '2024-01-22 22:05:16'),
(114, 1, 'free', 'manolirrnhpzmr.cloudinghub.com', '2024-01-22 22:33:59', '2024-01-22 22:33:59'),
(115, 1, 'free', 'webjgixbljl.cloudinghub.com', '2024-01-22 22:55:29', '2024-01-22 22:55:29'),
(116, 1, 'free', 'rafasygnslyp.cloudinghub.com', '2024-01-23 09:18:21', '2024-01-23 09:18:21'),
(117, 1, 'free', 'qr.cloudinghub.com', '2024-01-23 09:36:12', '2024-01-23 09:36:12'),
(118, 1, 'free', 'Javszagtrwzo.cloudinghub.com', '2024-01-23 18:58:49', '2024-01-23 18:58:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `folder`
--

CREATE TABLE `folder` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idFTP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `folder`
--

INSERT INTO `folder` (`id`, `name`, `idUser`, `idFTP`) VALUES
(1, '$2b$10$s', 1, NULL),
(2, '$2b$10$8', NULL, NULL),
(3, '$2b$10$i', NULL, NULL),
(4, '$2b$10$W', NULL, NULL),
(5, '$2b$10$n', NULL, NULL),
(6, '$2b$10$u', NULL, NULL),
(7, '$2b$10$4', NULL, NULL),
(8, '$2b$10$r', NULL, NULL),
(9, '$2b$10$M', NULL, NULL),
(10, '$2b$10$2', NULL, NULL),
(11, '$2b$10$7', NULL, NULL),
(12, '$2b$10$3', NULL, NULL),
(13, '$2b$10$p', NULL, NULL),
(14, '$2b$10$O', NULL, NULL),
(15, '$2b$10$z', NULL, NULL),
(16, '$2b$10$X', NULL, NULL),
(17, '$2b$10$E', NULL, NULL),
(18, '$2b$10$V', NULL, NULL),
(19, '$2b$10$Y', NULL, NULL),
(20, '$2b$10$F', NULL, NULL),
(21, '$2b$10$T', NULL, NULL),
(22, '$2b$10$D', NULL, NULL),
(23, '$2b$10$h', NULL, NULL),
(24, '$2b$10$j', NULL, NULL),
(25, '$2b$10$C', NULL, NULL),
(26, '$2b$10$a', NULL, NULL),
(27, '$2b$10$g', NULL, NULL),
(28, '$2b$10$b', NULL, NULL),
(29, '$2b$10$k', NULL, NULL),
(30, '$2b$10$9', NULL, NULL),
(31, '$2b$10$L', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ftp`
--

CREATE TABLE `ftp` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ftp`
--

INSERT INTO `ftp` (`id`, `username`, `password`, `path`) VALUES
(1, 'root', 'Contraseña', 'C:/xampp/htdocs');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `query` varchar(255) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `log`
--

INSERT INTO `log` (`id`, `query`, `idUser`, `username`, `created_at`) VALUES
(1, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:17:48'),
(2, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:17:49'),
(3, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:17:51'),
(4, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:17:52'),
(5, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:17:52'),
(6, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:17:52'),
(7, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:17:52'),
(8, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:17:52'),
(9, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:17:52'),
(10, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:17:52'),
(11, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:17:52'),
(12, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:17:54'),
(13, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:17:54'),
(14, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:17:54'),
(15, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:17:55'),
(16, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:17:55'),
(17, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloudinghub.com), $2b$10$H)', 1, 'root', '2024-01-23 09:18:16'),
(18, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloudinghub.com), $2b$10$r)', 1, 'root', '2024-01-23 09:18:16'),
(19, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:16'),
(20, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:17'),
(21, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloud.cloudinghub.com), $2b$10$b)', 1, 'root', '2024-01-23 09:18:17'),
(22, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloud.cloudinghub.com), $2b$10$c)', 1, 'root', '2024-01-23 09:18:17'),
(23, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = jointscounter.com), $2b$10$.)', 1, 'root', '2024-01-23 09:18:17'),
(24, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:17'),
(25, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = jointscounter.com), $2b$10$4)', 1, 'root', '2024-01-23 09:18:17'),
(26, 'INSERT INTO domain (type, url, idUser) VALUES (free, rafasygnslyp.cloudinghub.com, 1);', 1, 'root', '2024-01-23 09:18:21'),
(27, 'INSERT INTO webpage (idUser, idDomain, path, name, url, status) VALUES (1, 116, C:/xampp/htdocs/folders/$2b$10$s/rafasygnslyp.cloudinghub.com, rafa, rafasygnslyp.cloudinghub.com, 1);', 1, 'root', '2024-01-23 09:18:21'),
(28, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:23'),
(29, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:23'),
(30, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:23'),
(31, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:23'),
(32, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:25'),
(33, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:25'),
(34, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:25'),
(35, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:18:25'),
(36, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:25'),
(37, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:18:26'),
(38, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:36'),
(39, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:36'),
(40, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:37'),
(41, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:18:37'),
(42, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:37'),
(43, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:37'),
(44, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:18:37'),
(45, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:37'),
(46, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com), $2b$10$e)', 1, 'root', '2024-01-23 09:18:40'),
(47, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com), $2b$10$d)', 1, 'root', '2024-01-23 09:18:41'),
(48, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:50'),
(49, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:50'),
(50, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:18:52'),
(51, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:18:52'),
(52, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:18:52'),
(53, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:18:52'),
(54, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:18:52'),
(55, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:18:52'),
(56, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:18:52'),
(57, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:52'),
(58, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:18:52'),
(59, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:52'),
(60, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:18:52'),
(61, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:52'),
(62, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:52'),
(63, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:52'),
(64, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:52'),
(65, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:53'),
(66, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:53'),
(67, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:53'),
(68, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:18:53'),
(69, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:20:13'),
(70, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:20:13'),
(71, 'SELECT * FROM service', 0, '', '2024-01-23 09:20:13'),
(72, 'SELECT * FROM user_price WHERE idUser = 0 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 0, '', '2024-01-23 09:20:13'),
(73, 'SELECT * FROM user_price WHERE idUser = 0 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 0, '', '2024-01-23 09:20:13'),
(74, 'SELECT * FROM service', 0, '', '2024-01-23 09:20:13'),
(75, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:20:13'),
(76, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:20:13'),
(77, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:20:13'),
(78, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:20:13'),
(79, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:20:13'),
(80, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:20:13'),
(81, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:20:14'),
(82, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:20:14'),
(83, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:20:14'),
(84, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(85, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(86, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(87, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(88, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(89, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(90, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(91, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:14'),
(92, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:20:26'),
(93, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:26'),
(94, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:20:26'),
(95, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:26'),
(96, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:20:26'),
(97, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:20:26'),
(98, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:20:28'),
(99, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:20:29'),
(100, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:20:30'),
(101, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:30'),
(102, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:20:30'),
(103, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:20:30'),
(104, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:20:30'),
(105, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:20:30'),
(106, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:20:43'),
(107, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:20:43'),
(108, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:21:10'),
(109, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:21:10'),
(110, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:21:13'),
(111, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:21:13'),
(112, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:21:13'),
(113, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:21:13'),
(114, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:13'),
(115, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:13'),
(116, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:13'),
(117, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:13'),
(118, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:13'),
(119, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:13'),
(120, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:13'),
(121, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:13'),
(122, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:13'),
(123, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(124, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(125, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(126, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:21:14'),
(127, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:21:14'),
(128, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 09:21:14'),
(129, 'SELECT * FROM service', 1, 'root', '2024-01-23 09:21:14'),
(130, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:21:14'),
(131, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:14'),
(132, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:14'),
(133, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:14'),
(134, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(135, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(136, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(137, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(138, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(139, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(140, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(141, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:14'),
(142, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:14'),
(143, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:21:18'),
(144, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 09:21:18'),
(145, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:18'),
(146, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:18'),
(147, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:18'),
(148, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:18'),
(149, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:18'),
(150, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:18'),
(151, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:18'),
(152, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:19'),
(153, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:19'),
(154, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:19'),
(155, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:19'),
(156, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:19'),
(157, 'SELECT * FROM domain WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:20'),
(158, 'SELECT * FROM domain WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:20'),
(159, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:26'),
(160, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:26'),
(161, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:27'),
(162, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(163, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(164, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(165, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(166, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(167, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:27'),
(168, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(169, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(170, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:27'),
(171, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:29'),
(172, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 09:21:29'),
(173, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 09:21:29'),
(174, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:21:29'),
(175, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 09:21:29'),
(176, 'SELECT * FROM domain', 1, 'root', '2024-01-23 09:21:30'),
(177, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 18:58:14'),
(178, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 18:58:14'),
(179, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 18:58:14'),
(180, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 18:58:17'),
(181, 'SELECT * FROM service', 1, 'root', '2024-01-23 18:58:17'),
(182, 'SELECT * FROM service', 1, 'root', '2024-01-23 18:58:18'),
(183, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 18:58:18'),
(184, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 18:58:18'),
(185, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 18:58:18'),
(186, 'SELECT * FROM domain', 1, 'root', '2024-01-23 18:58:18'),
(187, 'SELECT * FROM domain', 1, 'root', '2024-01-23 18:58:18'),
(188, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:19'),
(189, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:19'),
(190, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:21'),
(191, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:21'),
(192, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = qr.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:21'),
(193, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:21'),
(194, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloudinghub.com), $2b$10$f)', 1, 'root', '2024-01-23 18:58:42'),
(195, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = qr.cloudinghub.com), $2b$10$Q)', 1, 'root', '2024-01-23 18:58:43'),
(196, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloudinghub.com), $2b$10$9)', 1, 'root', '2024-01-23 18:58:43'),
(197, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com), $2b$10$K)', 1, 'root', '2024-01-23 18:58:43'),
(198, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = cloud.cloudinghub.com), $2b$10$m)', 1, 'root', '2024-01-23 18:58:43'),
(199, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = jointscounter.com), $2b$10$S)', 1, 'root', '2024-01-23 18:58:44'),
(200, 'INSERT INTO domain (type, url, idUser) VALUES (free, Javszagtrwzo.cloudinghub.com, 1);', 1, 'root', '2024-01-23 18:58:49'),
(201, 'INSERT INTO webpage (idUser, idDomain, path, name, url, status) VALUES (1, 118, C:/xampp/htdocs/folders/$2b$10$s/Javszagtrwzo.cloudinghub.com, Javs, Javszagtrwzo.cloudinghub.com, 1);', 1, 'root', '2024-01-23 18:58:49'),
(202, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 18:58:52'),
(203, 'SELECT * FROM domain', 1, 'root', '2024-01-23 18:58:52'),
(204, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:52'),
(205, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:52'),
(206, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 18:58:56'),
(207, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:56'),
(208, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 18:58:56'),
(209, 'SELECT * FROM domain', 1, 'root', '2024-01-23 18:58:57'),
(210, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 18:58:57'),
(211, 'SELECT * FROM ftp WHERE username = (SELECT username FROM user WHERE id = 1)', 1, 'root', '2024-01-23 18:58:57'),
(212, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com), $2b$10$Q)', 1, 'root', '2024-01-23 18:59:03'),
(213, 'INSERT INTO screenshot (idWebpage, fileName) VALUES ((SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com), $2b$10$m)', 1, 'root', '2024-01-23 18:59:03'),
(214, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 19:29:46'),
(215, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 19:29:46'),
(216, 'SELECT id, name, username, email, hash, profile_picture FROM user WHERE hash = $2b$13$rk10ztaewVgU5KeqlHtpde', 1, 'root', '2024-01-23 19:29:46'),
(217, 'SELECT * FROM service', 1, 'root', '2024-01-23 19:29:46'),
(218, 'SELECT * FROM service', 1, 'root', '2024-01-23 19:29:46'),
(219, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 19:29:46'),
(220, 'SELECT * FROM user_price WHERE idUser = 1 AND idPrice IN (SELECT id from price WHERE type = webclient) AND active = 1', 1, 'root', '2024-01-23 19:29:46'),
(221, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 19:29:46'),
(222, 'SELECT * FROM webpage WHERE idUser = 1', 1, 'root', '2024-01-23 19:29:46'),
(223, 'SELECT * FROM domain', 1, 'root', '2024-01-23 19:29:46'),
(224, 'SELECT * FROM domain', 1, 'root', '2024-01-23 19:29:46'),
(225, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(226, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(227, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(228, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(229, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(230, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = qr.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(231, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(232, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = cloud.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(233, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = jointscounter.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(234, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = rafasygnslyp.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(235, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = qr.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46'),
(236, 'SELECT * FROM screenshot WHERE idWebpage = (SELECT id from webpage WHERE url = Javszagtrwzo.cloudinghub.com) ORDER BY id DESC LIMIT 1', 1, 'root', '2024-01-23 19:29:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `price`
--

CREATE TABLE `price` (
  `id` varchar(255) NOT NULL,
  `idStripe` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `mensuality` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `price`
--

INSERT INTO `price` (`id`, `idStripe`, `price`, `type`, `mensuality`, `created_at`, `updated_at`) VALUES
('price_1NfORBBfMzihRfkF9zP46cg3', 'prod_OSJ35OJsNnxjCy', '12', 'webclient', 'mensual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOV2BfMzihRfkF4OLUulnC', 'prod_OSJ35OJsNnxjCy', '18', 'webclient', 'trimestral', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOV2BfMzihRfkFNNgZGrsw', 'prod_OSJ35OJsNnxjCy', '48', 'webclient', 'anual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOW3BfMzihRfkF7MzpeGqr', 'prod_OSJ8Of7HPIBXz7', '15', 'api', 'trimestral', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOW3BfMzihRfkFGVBORtgq', 'prod_OSJ8Of7HPIBXz7', '42', 'api', 'anual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOW3BfMzihRfkFYmUPbwSJ', 'prod_OSJ8Of7HPIBXz7', '7,5', 'api', 'mensual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOWrBfMzihRfkFjCSFJ9ew', 'prod_OSJ96Q6aDchdSh', '20', 'database', 'mensual', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOWrBfMzihRfkFNeEiRpew', 'prod_OSJ96Q6aDchdSh', '37,5', 'database', 'trimestral', '2023-08-16 20:13:03', '2023-08-16 20:13:03'),
('price_1NfOWrBfMzihRfkFWs41Ugx3', 'prod_OSJ96Q6aDchdSh', '90', 'database', 'anual', '2023-08-16 20:13:03', '2023-08-16 20:13:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `screenshot`
--

CREATE TABLE `screenshot` (
  `id` int(11) NOT NULL,
  `idWebpage` int(11) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `screenshot`
--

INSERT INTO `screenshot` (`id`, `idWebpage`, `fileName`, `created_at`, `updated_at`) VALUES
(121, 77, '$2b$10$H', '2024-01-23 09:18:15', '2024-01-23 09:18:15'),
(122, 77, '$2b$10$r', '2024-01-23 09:18:15', '2024-01-23 09:18:15'),
(123, 78, '$2b$10$b', '2024-01-23 09:18:16', '2024-01-23 09:18:16'),
(124, 78, '$2b$10$c', '2024-01-23 09:18:17', '2024-01-23 09:18:17'),
(125, 83, '$2b$10$.', '2024-01-23 09:18:17', '2024-01-23 09:18:17'),
(126, 83, '$2b$10$4', '2024-01-23 09:18:17', '2024-01-23 09:18:17'),
(127, 104, '$2b$10$e', '2024-01-23 09:18:40', '2024-01-23 09:18:40'),
(128, 104, '$2b$10$d', '2024-01-23 09:18:41', '2024-01-23 09:18:41'),
(129, 77, '$2b$10$f', '2024-01-23 18:58:42', '2024-01-23 18:58:42'),
(130, 105, '$2b$10$Q', '2024-01-23 18:58:42', '2024-01-23 18:58:42'),
(131, 77, '$2b$10$9', '2024-01-23 18:58:43', '2024-01-23 18:58:43'),
(132, 104, '$2b$10$K', '2024-01-23 18:58:43', '2024-01-23 18:58:43'),
(133, 78, '$2b$10$m', '2024-01-23 18:58:43', '2024-01-23 18:58:43'),
(134, 83, '$2b$10$S', '2024-01-23 18:58:43', '2024-01-23 18:58:43'),
(135, 106, '$2b$10$Q', '2024-01-23 18:59:03', '2024-01-23 18:59:03'),
(136, 106, '$2b$10$m', '2024-01-23 18:59:03', '2024-01-23 18:59:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `idStripe` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `service`
--

INSERT INTO `service` (`id`, `idStripe`, `name`, `created_at`, `updated_at`) VALUES
(1, 'prod_OSJ35OJsNnxjCy', 'Cliente web', '2023-08-16 15:54:23', '2023-08-16 15:54:23'),
(2, 'prod_OSJ8Of7HPIBXz7', 'API REST', '2023-08-16 15:54:23', '2023-08-16 15:54:23'),
(3, 'prod_OSJ96Q6aDchdSh', 'Base de datos', '2023-08-16 15:54:23', '2023-08-16 15:54:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stripelinks`
--

CREATE TABLE `stripelinks` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idPrice` varchar(255) NOT NULL,
  `paymentLink` text DEFAULT NULL,
  `paymentId` text DEFAULT NULL,
  `plink` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stripelinks`
--

INSERT INTO `stripelinks` (`id`, `idUser`, `idPrice`, `paymentLink`, `paymentId`, `plink`) VALUES
(4, 1, 'price_1NfOV2BfMzihRfkF4OLUulnC', 'https://buy.stripe.com/test_eVaeWVgg8cGP9wY7ue', 'pi_3OAY1aBfMzihRfkF11uGwZZs', 'plink_1OAY0rBfMzihRfkFTnAjNJ8J'),
(7, 1, 'price_1NfORBBfMzihRfkF9zP46cg3', 'https://buy.stripe.com/test_6oEdSRfc4cGP8sUg0O', NULL, 'plink_1OXTMTBfMzihRfkF0R0skQaO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `email`, `hash`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'root', 'root', 'root', 'info.cloudinghub@gmail.com', '$2b$13$rk10ztaewVgU5KeqlHtpde', NULL, '2023-08-15 21:26:16', '2023-08-31 19:35:52'),
(2, 'paquito', 'alfa', 'alfa', 'alfa2@gmail.com', '63e2e6d48a416', NULL, '2023-08-31 19:36:57', '2023-08-31 19:36:57'),
(6, 'Primera prueba', 'beta', 'beta', 'jointscounter@gmail.com', '63e2e6d48a411', NULL, '2023-09-03 16:21:14', '2023-09-03 16:22:04'),
(7, 'javs', 'javs', 'javs', 'jvier7@gmail.com', '5d3ghgk86c', NULL, '2023-09-05 01:03:56', '2023-09-05 01:03:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_price`
--

CREATE TABLE `user_price` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idPrice` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user_price`
--

INSERT INTO `user_price` (`id`, `idUser`, `idPrice`, `active`, `created_at`, `updated_at`) VALUES
(2, 1, 'price_1NfOV2BfMzihRfkFNNgZGrsw', 1, '2023-08-16 20:19:58', '2023-08-16 20:19:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `webpage`
--

CREATE TABLE `webpage` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idDomain` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `webpage`
--

INSERT INTO `webpage` (`id`, `idUser`, `idDomain`, `path`, `name`, `url`, `status`, `created_at`, `updated_at`) VALUES
(77, 1, 90, 'C:/xampp/htdocs/cloudinghub', 'Cloudinghub', 'cloudinghub.com', 1, '2023-11-02 20:37:49', '2023-11-02 20:37:49'),
(78, 1, 91, 'C:/xampp/htdocs/cloud', 'Private Cloud', 'cloud.cloudinghub.com', 1, '2023-11-02 20:38:18', '2023-11-02 20:38:18'),
(83, 1, 89, 'C:/xampp/htdocs/jointscounter', 'Jointscounter', 'jointscounter.com', 1, '2024-01-22 16:46:55', '2024-01-22 16:46:55'),
(104, 1, 116, 'C:/xampp/htdocs/folders/$2b$10$s/rafasygnslyp.cloudinghub.com', 'rafa', 'rafasygnslyp.cloudinghub.com', 1, '2024-01-23 09:18:21', '2024-01-23 09:18:21'),
(105, 1, 117, 'C:/xampp/htdocs/qr', 'Qr Generator', 'qr.cloudinghub.com', 1, '2024-01-23 09:37:14', '2024-01-23 09:37:14'),
(106, 1, 118, 'C:/xampp/htdocs/folders/$2b$10$s/Javszagtrwzo.cloudinghub.com', 'Javs', 'Javszagtrwzo.cloudinghub.com', 1, '2024-01-23 18:58:49', '2024-01-23 18:58:49');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `domain`
--
ALTER TABLE `domain`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `fk_folder_ftp` (`idFTP`);

--
-- Indices de la tabla `ftp`
--
ALTER TABLE `ftp`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `screenshot`
--
ALTER TABLE `screenshot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idWebpage` (`idWebpage`);

--
-- Indices de la tabla `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idStripe` (`idStripe`);

--
-- Indices de la tabla `stripelinks`
--
ALTER TABLE `stripelinks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_stripeLinks` (`idUser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_price`
--
ALTER TABLE `user_price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idPrice` (`idPrice`);

--
-- Indices de la tabla `webpage`
--
ALTER TABLE `webpage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `domain`
--
ALTER TABLE `domain`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `folder`
--
ALTER TABLE `folder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `ftp`
--
ALTER TABLE `ftp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT de la tabla `screenshot`
--
ALTER TABLE `screenshot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT de la tabla `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `stripelinks`
--
ALTER TABLE `stripelinks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `user_price`
--
ALTER TABLE `user_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `webpage`
--
ALTER TABLE `webpage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `domain`
--
ALTER TABLE `domain`
  ADD CONSTRAINT `domain_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `folder`
--
ALTER TABLE `folder`
  ADD CONSTRAINT `fk_folder_ftp` FOREIGN KEY (`idFTP`) REFERENCES `ftp` (`id`),
  ADD CONSTRAINT `folder_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `screenshot`
--
ALTER TABLE `screenshot`
  ADD CONSTRAINT `screenshot_ibfk_1` FOREIGN KEY (`idWebpage`) REFERENCES `webpage` (`id`);

--
-- Filtros para la tabla `stripelinks`
--
ALTER TABLE `stripelinks`
  ADD CONSTRAINT `fk_user_stripeLinks` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_price`
--
ALTER TABLE `user_price`
  ADD CONSTRAINT `user_price_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_price_ibfk_2` FOREIGN KEY (`idPrice`) REFERENCES `price` (`id`);

--
-- Filtros para la tabla `webpage`
--
ALTER TABLE `webpage`
  ADD CONSTRAINT `webpage_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
