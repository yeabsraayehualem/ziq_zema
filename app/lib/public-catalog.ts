export type Course = {
  id: number;
  name: string;
  icon: string | null;
};

export type Package = {
  id: number;
  course: number;
  course_name: string;
  duration: string;
  days_in_week: string;
  price: number;
};

export type Schedule = {
  id: number;
  package: number;
  package_name: string;
  package_detail: Package;
  days: number[];
  days_names: string[];
  start_time: string;
  end_time: string;
};

export type PublicCatalog = {
  courses: Course[];
  packages: Package[];
  schedules: Schedule[];
};

const emptyCatalog: PublicCatalog = { courses: [], packages: [], schedules: [] };

export async function getPublicCatalog(): Promise<PublicCatalog> {
  const apiOrigin = (process.env.DJANGO_API_ORIGIN ?? 'http://127.0.0.1:8000').replace(/\/+$/, '');

  try {
    const response = await fetch(`${apiOrigin}/api/v1/public/catalog/`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Catalog request failed with status ${response.status}`);

    const catalog = await response.json() as Partial<PublicCatalog>;
    return {
      courses: Array.isArray(catalog.courses) ? catalog.courses : [],
      packages: Array.isArray(catalog.packages) ? catalog.packages : [],
      schedules: Array.isArray(catalog.schedules) ? catalog.schedules : [],
    };
  } catch (error) {
    console.error('Unable to load the public course catalog.', error);
    return emptyCatalog;
  }
}
