<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'neparchi' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'I$t?<gc0=IXd66Xu~i|!]:>-hO4.X#,a)c}7j%<bFrEmFm83Nv$G&lLf]K*GG4kC' );
define( 'SECURE_AUTH_KEY',  '^}!Iuq;!2)BECs~@OObdJRXIYW8l-`Z)W^$(6?E+aUM5# A}/E228Hx~ldEPfT,.' );
define( 'LOGGED_IN_KEY',    '7y2s~T]qsMP!9a`][o#Vfd$XV4cP%gAYRqLnXj2yVnzMUXB<l7]gsRyCwjH<EcEG' );
define( 'NONCE_KEY',        'r^g}Pn=3/taW_5s&F!OP^I]@U<fghDO OYq}Bd=Edcl%8+AX/.6SCwoDJ,3wX?yO' );
define( 'AUTH_SALT',        ',@XKO,r]XHKW~:ELqdEXMin%w;eew|V{]#eP% z,SPi-GT;L1Z6%lyvjLcon[$>%' );
define( 'SECURE_AUTH_SALT', ' bVIiJ@NrdKPcRthrL1uQ)-85v;d}eUc@R&&_$8:]DA8m<Ry7TEN^:cCk)vm(OKl' );
define( 'LOGGED_IN_SALT',   '6L%;4 Do=HqN?.+lX1!7ogqRMKcrd1ZhZSOKZd[_5G Yr4GQ/p?v6a2Ze][>Ogb0' );
define( 'NONCE_SALT',       '>R<vxO0isdz)Y54jf*g^sl{K(!O$d+-*N83NNK-y4uyQqEtk3s4z8BraAt$A7*AR' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
