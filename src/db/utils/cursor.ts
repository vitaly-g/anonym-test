class CursorService {
  create(params: any): string {
    const searchParams = [];

    for (const key in params) {
      searchParams.push(`${key}:${params[key]}`);
    }

    const base64 = this.btoa(searchParams.join(','));
    return encodeURIComponent(base64);
  }

  decode(cursor: string) {
    const base64 = decodeURIComponent(cursor);
    const cursors: any = {};
    const columns = this.atob(base64).split(',');
    columns.forEach((column) => {
      const [key, raw] = column.split(':');
      cursors[key] = raw;
    });

    return cursors;
  }

  private atob(value: string): string {
    return Buffer.from(value, 'base64').toString();
  }

  private btoa(value: string): string {
    return Buffer.from(value).toString('base64');
  }
}

export default new CursorService();