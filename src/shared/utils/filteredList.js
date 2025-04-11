export default function filteredList(menuItems, userPermissions) {
  const permissions = userPermissions;

  if (permissions) {
    return menuItems.filter(
      (x) =>
        (x.permissions &&
          permissions.some((r) => x.permissions.indexOf(r) >= 0)) ||
        !x.permissions ||
        x.permissions?.length === 0
    );
  } else {
    return menuItems;
  }
}
